// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Post schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});

// Sets the createdAt parameter equal to the current time
PostSchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Exports the PostSchema for use elsewhere
module.exports = mongoose.model('Post', PostSchema);
