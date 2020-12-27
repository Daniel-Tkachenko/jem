const LocationModel = require('../models/location.model');

const getAllLocations = () => {
  return new Promise((resolve, reject) => {
    LocationModel.find({}, (err, locations) => {
      if(err){
        reject({
          status: 500,
          message: err
        })
      }
      resolve(locations);
    })
  })
}

const getLocationByUrl = url => {
  return new Promise((resolve, reject) => {
    LocationModel.find({ url }, (err, location) => {
      if(err){
        reject({
          status: 500,
          message: err
        })
      }
      if(!location || location.length < 1){
        reject({
          status: 404,
          message: err
        })
      }
      resolve(location[0]);
    })
  })
}

module.exports = {
  getAllLocations,
  getLocationByUrl
}