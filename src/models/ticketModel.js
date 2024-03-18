

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  number: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    // required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: [String]  // Si files es una lista de nombres de archivo, por ejemplo
});

module.exports = mongoose.model('Ticket', ticketSchema);
