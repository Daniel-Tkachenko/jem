const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({})

module.exports = mongoose.model('Portfolio', PortfolioSchema);