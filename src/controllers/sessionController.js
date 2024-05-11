const db = require('../db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Controlador para iniciar sesión
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Verificar si el formato del correo electrónico es válido
  if (!email || !password || !isValidEmail(email)) {
    return res.status(400).json({
      mensaje: 'El correo electrónico y la contraseña son obligatorios',
    });
  }

  // Buscar la cuenta por correo electrónico
  const query = 'SELECT * FROM Account WHERE Email = ?';
  const [account] = await db.query(query, {
    replacements: [email],
    type: db.QueryTypes.SELECT,
  });

  // Verificar si se encontró la cuenta
  if (!account) {
    return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
  }

  // Verificar si la cuenta está activa
  if (account.State !== 1) {
    return res.status(401).json({ mensaje: 'La cuenta no está activa' });
  }

  // Verificar la contraseña
  const passwordMatch = await bcrypt.compare(password, account.Password);
  if (!passwordMatch) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  // Iniciar sesión exitosa
  res.status(200).json({ ...account, password: null });
};

// Controlador para registrar un nuevo usuario
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, lastName, gender, email, password, type } = req.body;

  if (!name || !lastName || !email || !password || !isValidEmail(email)) {
    return res.status(400).json({
      mensaje:
        'Todos los campos son obligatorios y el correo electrónico debe tener un formato válido',
    });
  }

  // Verificar si ya existe una cuenta con el mismo correo electrónico
  const existingAccount = await db.query(
    'SELECT * FROM Account WHERE Email = ?',
    {
      replacements: [email],
      type: db.QueryTypes.SELECT,
    }
  );
  if (existingAccount.length > 0) {
    return res
      .status(400)
      .json({ mensaje: 'Ya existe una cuenta con este correo electrónico' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar el nuevo usuario en la base de datos
  const query =
    'INSERT INTO Account (Id, Name, LastName, Email, Password, CreationDate, State, Type) VALUES (newid(), ?, ?, ?, ?, GETDATE(), 1, ?)';
  await db.query(query, {
    replacements: [name, lastName, email, hashedPassword, type],
  });

  res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
};

// Controlador para restablecer la contraseña
exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, newPassword } = req.body;

  // Verificar si todos los campos requeridos están presentes
  if (!email || !newPassword || !isValidEmail(email)) {
    return res.status(400).json({
      mensaje:
        'El correo electrónico y la nueva contraseña son obligatorios y el correo electrónico debe tener un formato válido',
    });
  }

  // Verificar si la cuenta existe
  const existingAccount = await db.query(
    'SELECT * FROM Account WHERE Email = ?',
    {
      replacements: [email],
      type: db.QueryTypes.SELECT,
    }
  );
  if (existingAccount.length === 0) {
    return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
  }

  // Encriptar la nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña en la base de datos
  await db.query('UPDATE Account SET Password = ? WHERE Email = ?', {
    replacements: [hashedPassword, email],
  });

  res.status(200).json({ mensaje: 'Contraseña restablecida exitosamente' });
};

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
