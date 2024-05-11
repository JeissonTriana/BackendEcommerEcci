const db = require('../db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, lastName, email, password, gender, type } = req.body;

  // Verificar si todos los campos requeridos están presentes
  if (!name || !lastName || !email || !password || !isValidEmail(email)) {
    return res
      .status(400)
      .json({
        mensaje:
          'Todos los campos son obligatorios y el correo electrónico debe tener un formato válido',
      });
  }

  // Verificar si ya existe un usuario con el mismo correo electrónico
  const existingUser = await db.query('SELECT * FROM Account WHERE Email = ?', {
    replacements: [email],
    type: db.QueryTypes.SELECT,
  });
  if (existingUser.length > 0) {
    return res
      .status(400)
      .json({ mensaje: 'Ya existe un usuario con este correo electrónico' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar el nuevo usuario en la base de datos
  const query =
    'INSERT INTO Account (Id, Name, LastName, Email, Password, Gender, CreationDate, State, Type) VALUES (newid(), ?, ?, ?, ?, ?, GETDATE(), 1, ?)';
  await db.query(query, {
    replacements: [
      name,
      lastName,
      email,
      hashedPassword,
      gender || null,
      type || 0,
    ],
  });

  res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  const users = await db.query('SELECT * FROM Account', {
    type: db.QueryTypes.SELECT,
  });
  res.json(users);
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await db.query('SELECT * FROM Account WHERE Id = ?', {
    replacements: [id],
    type: db.QueryTypes.SELECT,
  });
  if (!user.length) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
  res.json(user[0]);
};

// Controlador para actualizar un usuario existente
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, lastName, email, password, gender, type } = req.body;

  const existingUser = await db.query('SELECT * FROM Account WHERE Id = ?', {
    replacements: [id],
    type: db.QueryTypes.SELECT,
  });
  if (!existingUser.length) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Verificar si el correo electrónico ya existe y no es del usuario actual
  if (email !== existingUser[0].Email) {
    const existingEmail = await db.query(
      'SELECT * FROM Account WHERE Email = ?',
      {
        replacements: [email],
        type: db.QueryTypes.SELECT,
      }
    );
    if (existingEmail.length > 0) {
      return res
        .status(400)
        .json({ mensaje: 'Ya existe un usuario con este correo electrónico' });
    }
  }

  // Encriptar la contraseña si se proporcionó
  let hashedPassword = existingUser[0].Password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Actualizar los datos del usuario en la base de datos
  await db.query(
    'UPDATE Account SET Name = ?, LastName = ?, Email = ?, Password = ?, Gender = ?, Type = ? WHERE Id = ?',
    {
      replacements: [
        name,
        lastName,
        email,
        hashedPassword,
        gender || null,
        type,
        id,
      ],
    }
  );

  res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
};

// Controlador para eliminar un usuario existente
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await db.query('SELECT * FROM Account WHERE Id = ?', {
    replacements: [id],
    type: db.QueryTypes.SELECT,
  });
  if (!user.length) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Eliminar el usuario de la base de datos
  await db.query('DELETE FROM Account WHERE Id = ?', {
    replacements: [id],
  });

  res.json({ mensaje: 'Usuario eliminado exitosamente' });
};

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
