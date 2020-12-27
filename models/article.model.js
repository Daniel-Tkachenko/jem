const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String
  },
  titleRu: {
    type: String
  },
  content: {
    brief: {
      type: String
    },
    extended: {
      type: String
    }
  },
  contentRu: {
    brief: {
      type: String
    },
    extended: {
      type: String
    }
  },
  image: {
    url: {
      type: String
    }
  },
  url: {
    type: String
  }
})


module.exports = mongoose.model('Post', ArticleSchema);