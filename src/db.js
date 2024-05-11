const { Sequelize } = require('sequelize');

// Crea una nueva instancia de Sequelize
const sequelize = new Sequelize({
  dialect: 'mssql', // Especifica el dialecto de SQL Server
  dialectOptions: {
    options: {
      encrypt: true // Habilita la encriptación para conexiones a Azure SQL Database
    }
  },
  host: 'projectecommerce.database.windows.net', // Cambia por la dirección del servidor SQL Server
  port: '1433', // Cambia por el puerto de SQL Server (normalmente 1433)
  username: 'project-usr', // Cambia por el nombre de usuario de la base de datos
  password: 'PeEGbw@354s12345', // Cambia por la contraseña de la base de datos
  database: 'ProjectEcomerce' // Cambia por el nombre de la base de datos
});

module.exports = sequelize;