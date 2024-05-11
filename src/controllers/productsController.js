const db = require('../db');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  const productos = await db.query('SELECT * FROM Product', {
    type: db.QueryTypes.SELECT,
  });
  res.json(productos);
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const producto = await db.query('SELECT * FROM Product WHERE Id = ?', {
    replacements: [id],
    type: db.QueryTypes.SELECT,
  });
  if (!producto.length) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.json(producto[0]);
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { Name, Description, Price, Count, Image } = req.body;
  if (!Name || !Description || !Image) {
    return res.status(400).json({
      error:
        'El cuerpo de la solicitud debe contener name, description, price, count y image',
    });
  }

  const query = `INSERT INTO Product (Id, Name, Description, Price, Count, Image) VALUES (newid(), ?, ?, ?, ?, ?)`;
  try {
    const nuevoProducto = await db.query(query, {
      replacements: [Name, Description, Price, Count, Image],
    });
    res.status(201).json({
      Id: nuevoProducto.insertId,
      Name: Name,
      Description: Description,
      Price: Price,
      Count: Count,
      Image: Image,
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ mensaje: 'Error al crear el producto' });
  }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Name, Description, Price, Count, Image } = req.body;

  const producto = await db.query(
    'UPDATE Product SET Name = ?, Description = ?, Price = ?, Count = ?, Image = ? WHERE Id = ?',
    { replacements: [Name, Description, Price, Count, Image, id] }
  );
  if (producto[0].affectedRows === 0) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.json({
    Id: id,
    Name: Name,
    Description: Description,
    Price: Price,
    Count: Count,
    Image: Image,
  });
};

// Eliminar un producto existente
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const producto = await db.query('DELETE FROM Product WHERE Id = ?', {
    replacements: [id],
  });
  if (producto[0].affectedRows === 0) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.json({ mensaje: 'Producto eliminado exitosamente' });
};
