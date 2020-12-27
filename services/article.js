const ArticleModel = require('../models/article.model');

const getAllArticles = () => {
  return new Promise((resolve, reject) => {
    ArticleModel.find({}, (err, articles) => {
      if(err){
        reject({
          status: 500,
          message: err
        })
      }
      resolve(articles);
    })
  })
}

const getArticleByUrl = url => {
  return new Promise((resolve, reject) => {
    ArticleModel.find({ url }, (err, article) => {
      if(err){
        reject({
          status: 500,
          message: err
        })
      }
      if(!article || article.length < 1){
        reject({
          status: 404,
          message: err
        })
      }
      resolve(article[0]);
    })
  })
}

module.exports = {
  getAllArticles,
  getArticleByUrl
}