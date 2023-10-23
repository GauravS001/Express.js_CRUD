const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
   title:{
    type: String,
    required: true,
   },
   director: String,
   genere: String
})

const mModel = mongoose.model('movies', movieSchema);

module.exports = mModel;