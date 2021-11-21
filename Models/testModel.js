
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    name:String,
    School:String,
    Address:String,
    ZipCode:Number,
    isMarried: Boolean,
    CheckedDate : Date,
    BookedDate : Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

MovieSchema.index({ name: 1 ,School:1});
const Movies = mongoose.model('loadtest', MovieSchema);

module.exports = Movies;
