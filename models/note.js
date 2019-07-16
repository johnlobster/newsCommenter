var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;