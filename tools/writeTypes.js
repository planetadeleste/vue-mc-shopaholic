/* eslint-disable no-undef */
const { readFileSync } = require('fs');
const { forEach, template, templateSettings } = require('lodash');
const os = require('os');
const insertLine = require('insert-line');

const sTemplate = `
  interface {{ MODEL }} extends Model<{{ MODEL }}Data>, {{ MODEL }}Data {}
  class {{ MODEL }} extends Model<{{ MODEL }}Data> {}
  class {{ MODEL }}Collection extends Collection<{{ MODEL }}> {}

`;

const writeTypes = (sModel) => {
  const sFile = './src/index.d.ts';
  const content = readFileSync(sFile, 'utf-8');
  const lines = content.split(os.EOL);
  let insertAt = 0;

  forEach(lines, (line, idx) => {
    if (line.includes('export {')) {
      insertAt = idx;
    }
  });

  templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  const compiled = template(sTemplate);
  const sValue = compiled({ MODEL: sModel });

  insertLine(sFile)
    .content(sValue)
    .at(insertAt)
    .then(() => {
      console.log(`${sModel} inserted on index.t.ts`);
    });
};

exports.writeTypes = writeTypes;
