/* eslint-disable no-undef */
const { writeFile } = require("fs");
const dirTree = require("directory-tree");
const { chain, map, get, join, template, templateSettings, set } = require("lodash");

const writeImportExport = (sPlugin) => {
  const obFolders = {};
  dirTree("src", {}, null, (item) => {
    if (["collections", "models"].includes(item.name)) {
      const arFiles = map(item.children, file => get(file, "name").replace(".ts", ""));
      set(obFolders, item.name, arFiles);
    }
  });

  // const arFiles = chain(tree.children)
  //   .filter(item => item.type == "directory")
  //   .keyBy("name")
  //   .mapValues(item => {
  //     return map(item.children, file => get(file, "name").replace(".ts", ""));
  //   })
  //   .value();
  
  const importCollections = chain(obFolders.collections)
    .map(sFile => `import ${sFile} from "./collections/${sFile}";`)
    .join("\n")
    .value();
  const exportCollections = `export { ${join(obFolders.collections, ", ")} };\n`;
  const importModels = chain(obFolders.models)
    .map(sFile => `import ${sFile} from "./models/${sFile}";`)
    .join("\n")
    .value();
  const exportModels = `export { ${join(obFolders.models, ", ")} };\n`;

  const sTemplate = `
  /**
   * Models and Collections for {{ plugin }} plugin
   *
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   */
  
  // COLLECTIONS
  {{ importCollections }}
  
  {{ exportCollections }}
  
  
  // MODELS
  {{ importModels }}
  
  {{ exportModels }}
  `;

  templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  const compiled = template(sTemplate);
  const sValue = compiled({
    importCollections: importCollections,
    exportCollections: exportCollections,
    importModels: importModels,
    exportModels: exportModels,
    plugin: sPlugin
  });

  writeFile(`src/index.ts`, sValue, err => {
    if (err) throw err;

    console.info("index.ts saved!");
  });
};

const writeTypesIndex = () => {
  const tree = dirTree("src/types");
  const arFiles = chain(tree.children)
    .filter(item => item.name != "index.d.ts")
    .map(item => {
      const sName = item.name.replace(".d.ts", "");
      return `export * from "./${sName}";`;
    })
    .join("\n")
    .value();
  
  writeFile("src/types/index.d.ts", arFiles, err => {
    if (err) throw err;

    console.info("index.d.ts saved!");
  });
}

exports.writeImportExport = writeImportExport;
exports.writeTypesIndex = writeTypesIndex;
