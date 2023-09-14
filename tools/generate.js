/* eslint-disable no-undef */
const { generateTemplateFiles } = require("generate-template-files");
const { writeImportExport, writeTypesIndex } = require("./writeIndex");
const { name } = require("../package.json");

generateTemplateFiles([
  // Generate Model
  {
    option: "Create Model and Collection",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./tools/templates/mc/"
    },
    stringReplacers: ["__model__", "__route__"],
    output: {
      path: "./src",
      pathAndFileNameDefaultCase: "(pascalCase)",
      overwrite: true
    },
    onComplete: results => {
      console.log(`results`, results);
      // const arReplacers = get(results, "stringReplacers");
      // const obPlugin = find(arReplacers, { slot: "__plugin__" });
      // const sPluginValue = get(obPlugin, "slotValue");
      // const sPlugin = startCase(camelCase(sPluginValue)).replace(/ /g, "");
      // const sPath = kebabCase(sPluginValue);
      
      writeImportExport(name);
      writeTypesIndex();
    }
  }
]);
