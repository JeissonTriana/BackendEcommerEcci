const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/', async (req, res) => {
  try {
    await productController.getProducts(req, res);
  } catch (error) {
    console.error('Error en la solicitud GET /products:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para obtener un producto por su Id
router.get('/ById', async (req, res) => {
  try {
    await productController.getProductById(req, res);
  } catch (error) {
    console.error('Error en la solicitud GET /products/ById:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    await productController.createProduct(req, res);
  } catch (error) {
    console.error('Error en la solicitud POST /products:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await productController.updateProduct(req, res);
  } catch (error) {
    console.error('Error en la solicitud UPDATE /products:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
  } catch (error) {
    console.error('Error en la solicitud DELETE /products:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
module.exports = router;
