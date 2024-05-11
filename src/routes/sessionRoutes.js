const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Rutas para la gestión de sesiones
router.post('/login', async (req, res) => {
  try {
    await sessionController.login(req, res);
  } catch (error) {
    console.error('Error en la solicitud POST /login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.post('/register', async (req, res) => {
  try {
    await sessionController.register(req, res);
  } catch (error) {
    console.error('Error en la solicitud POST /register:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    await sessionController.resetPassword(req, res);
  } catch (error) {
    console.error('Error en la solicitud POST /reset-password:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
