const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({})

module.exports = mongoose.model('Location', LocationSchema);