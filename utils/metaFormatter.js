"use strict";

const fs = require("fs");
const SeoModel = require('../models/seo.model');

// index.html formatting pipeline
const formatIndex = (url, indexPath) => {
  let isFound = true;
  return getMetaTagsContent(url)
    .then(seo => {
      if (!seo)
        isFound = false;
      return setTagsContent(seo)
    })
    .then(tags => insertMeta(indexPath, tags))
    .then(formatted => {
      return {
        isFound,
        formatted
      };
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

// Retrieving seo data (e.g. title, description etc.) from db based on the page url.
const getMetaTagsContent = url => {
  return new Promise((resolve, reject) => {
    let page = (url === '/') ? 'main' : url.substring(1, url.length);
    console.log(page)
    SeoModel.findOne({ "url": page }, (err, seo) => {
      console.log(seo)
      if (err) {
        reject(err);
      } else {
        resolve(seo);
      }
    });
  });
};

// Returning object containing all of the necessary OpenGraph meta.
const setTagsContent = seo => {
  if (!seo) {
    return {
      '___OG_TITLE___': '',
      '___OG_TYPE___': '',
      '___OG_URL___': '',
      '___OG_DESCRIPTION___': ''
    };
  }
  return {
    '___OG_TITLE___': seo.title,
    '___OG_TYPE___': seo.pageType,
    '___OG_URL___': 'https://localhost:8080/' + ((seo.url === 'main') ? '' :  seo.url),
    '___OG_DESCRIPTION___': seo.description
  };
};

// Inserting retrieved tags in the index.html
const insertMeta = (path, tags) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(replacePlaceholders(data, tags));
      }
    });
  });
};

const replacePlaceholders = (data, tags) => {
  for (let tag in tags) {
    data = data.replace(new RegExp(tag, 'g'), tags[tag]);
  }
  return data;
};

module.exports = formatIndex;
