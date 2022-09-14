// Importaciones, recursos necesarios
const express = require('express');
const app = express();
const apiRoutes = require ('./routers/app.routers');
const loggerMiddleware = require ('./middlewares/logger.js')



// Servidor
const PORT = process.env.PORT || 8080;

// Middlewares generales de la app
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

// Activar funcionamiento del servidor
const connectedServer = app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
  });
  
  connectedServer.on('error', (error) => {
    console.error('Error: ', error);
  })