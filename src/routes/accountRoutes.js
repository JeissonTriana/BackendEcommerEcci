const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Rutas para la gestión de usuarios
router.post('/', async (req, res) => {
  try {
    await accountController.createUser(req, res);
  } catch (error) {
    console.error('Error en la solicitud POST /users:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    await accountController.getAllUsers(req, res);
  } catch (error) {
    console.error('Error en la solicitud GET /users:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await accountController.getUserById(req, res);
  } catch (error) {
    console.error('Error en la solicitud GET /users/:id:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await accountController.updateUser(req, res);
  } catch (error) {
    console.error('Error en la solicitud PUT /users/:id:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await accountController.deleteUser(req, res);
  } catch (error) {
    console.error('Error en la solicitud DELETE /users/:id:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
