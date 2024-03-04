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
  img: String
});

module.exports = mongoose.model('Movie', movieSchema, 'MediocreMovies-Collection-2');
