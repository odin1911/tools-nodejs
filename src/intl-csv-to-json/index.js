/*
tamic 国际化配置工具
根据 en 配置文件，根据 ru.csv 生成 ru.json
*/

const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const template = require('./tamic-ru/en_us.json');

const outputPath = path.join(__dirname, './tamic-ru/ru-RU.json');
const csvFilePath = path.join(__dirname, './tamic-ru/RUS-src_assets_locales_en_us.csv');

const CN_KEY = '中文';
const EN_KEY = '英文';
const RU_KEY = '俄文';

function getJsonKey(en) {
  let key = null;
  Object.entries(template).forEach(([k, v]) => {
    if (v === en) {
      key = key || k;
    }
  });
  return key;
}

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const outputObj = {};
    // console.log(jsonObj);
    jsonObj.forEach((v) => {
      const en = v[EN_KEY];
      const ru = v[RU_KEY];
      const key = getJsonKey(en);
      if (key) {
        delete template[key];
        outputObj[key] = ru;
      }
    });
    console.warn('🚀 ~ after ~ template', template);
    fs.writeFileSync(outputPath, JSON.stringify(outputObj, null, 2), 'utf8');
  });
