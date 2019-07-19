const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  fullArticleUrl: String,
  pictureUrl: String,
  notes: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: String,
    content: String 
  }],
  created: Date // string might be easier to deal with MM-DD-YYYY
});

// This creates our model from the above schema, using mongoose's model method
let Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;