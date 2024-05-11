const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const productsRoutes = require('./src/routes/productsRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const accountRoutes = require('./src/routes/accountRoutes');
const swaggerDocument = require('./src/swagger');
const sequelize = require('./src/db');

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*'  // Permite solicitudes de este origen
}));

app.use('/product', productsRoutes);
app.use('/session', sessionRoutes);
app.use('/account', accountRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

  try {
    // Sincroniza los modelos con la base de datos
    await sequelize.sync();
    console.log('Base de datos conectada y sincronizada correctamente');
  } catch (error) {
    console.error('Error al conectar y sincronizar la base de datos:', error);
  }
});
