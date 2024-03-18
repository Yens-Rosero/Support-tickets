const express = require('express');
const cors = require('cors');
const winston = require('winston'); // Importar Winston
const app = express();
const ticketRoutes = require('./src/routes/ticketRoutes');
const { connectToDatabase } = require('./src/db/database'); // Importar la función connectToDatabase
const morgan = require('morgan');
const discordBot = require('./src/bot/bot');

const corsOptions = {
  // origin: 'http://example.com', // Permitir solo solicitudes desde este origen
  optionsSuccessStatus: 200 // Cambiar el código de estado de respuesta para las pre-vuelos OPTIONS
};

// Middleware para manejar JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(morgan('dev')); // 'dev' muestra los registros en formato conciso


connectToDatabase();

// Conectar las rutas
app.use('/api/v1', ticketRoutes);

// Configuración del logger Winston
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

discordBot.login();

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  logger.log('info', `Servidor escuchando en el puerto ${PORT}`);
});
