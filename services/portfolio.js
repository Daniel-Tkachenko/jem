const PortfolioModel = require('../models/portfolio.model');

const getAllPortfolios = () => {
  return new Promise((resolve, reject) => {
    PortfolioModel.find({}, (err, portfolios) => {
      if(err){
        reject({
          status: 500,
          message: err
        })
      }
      resolve(portfolios);
    })
  })
}

const getPortfolioByUrl = url => {
  return new Promise((resolve, reject) => {
    PortfolioModel.find({ url }, (err, portfolio) => {
      if(err){
        reject({
          status: 500,
          message: err
        })
      }
      if(!portfolio || portfolio.length < 1){
        reject({
          status: 404,
          message: err
        })
      }
      resolve(portfolio[0]);
    })
  })
}

module.exports = {
  getAllPortfolios,
  getPortfolioByUrl
}