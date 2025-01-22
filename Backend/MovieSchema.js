const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName: String,
  releaseDate: String,
  industry: String,
  director: String,
  budget: String,
  imdbRating: String,
  rottenTomatoesRating: String,
  hasSequel: Boolean,
  img: String,
  created_by: String
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = { MovieModel };
 