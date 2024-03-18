// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Ruta para obtener todos los tickets
// router.get('/tickets', ticketController.getAllTickets);

// Ruta para crear un nuevo ticket
router.post('/tickets', ticketController.createTicket);

module.exports = router;
