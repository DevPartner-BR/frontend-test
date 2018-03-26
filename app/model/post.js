var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  galeriaId: {
    type: Number,
  },
  youtubeId: {
    type: String,
  },
  titulo: {
    type: String,
  },
  subTitulo: {
    type: String,
  },
  conteudo: {
    type: String,
  },
  imagemThumbnailUrl: {
    type: String,
  }
});

mongoose.model('Post', schema);

