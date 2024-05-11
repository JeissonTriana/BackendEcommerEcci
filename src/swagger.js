const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Gestión de Usuarios API',
    description: 'API para gestionar usuarios',
    version: '1.0.0',
  },
  paths: {
    '/account': {
      post: {
        summary: 'Crear un nuevo usuario',
        description: 'Crea un nuevo usuario en el sistema',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  lastName: {
                    type: 'string',
                  },
                  phone: {
                    type: 'string',
                  },
                  gender: {
                    type: 'boolean',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                  },
                  type: {
                    type: 'integer',
                  },
                },
                required: ['name', 'lastName', 'email', 'password', 'type'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Usuario creado exitosamente',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
      get: {
        summary: 'Obtener todos los usuarios',
        description: 'Obtiene una lista de todos los usuarios en el sistema',
        responses: {
          200: {
            description: 'Lista de usuarios obtenida exitosamente',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
    '/account/{id}': {
      get: {
        summary: 'Obtener un usuario por su ID',
        description: 'Obtiene un usuario específico por su ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del usuario a obtener',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Usuario obtenido exitosamente',
          },
          404: {
            description: 'Usuario no encontrado',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
      put: {
        summary: 'Actualizar un usuario existente',
        description: 'Actualiza un usuario existente en el sistema',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del usuario a actualizar',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  lastName: {
                    type: 'string',
                  },
                  phone: {
                    type: 'string',
                  },
                  gender: {
                    type: 'boolean',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                  },
                  type: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Usuario actualizado exitosamente',
          },
          404: {
            description: 'Usuario no encontrado',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
      delete: {
        summary: 'Eliminar un usuario',
        description: 'Elimina un usuario existente del sistema',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del usuario a eliminar',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Usuario eliminado exitosamente',
          },
          404: {
            description: 'Usuario no encontrado',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
    '/product': {
      get: {
        summary: 'Obtener todos los productos',
        tags: ['Product'],
        responses: {
          200: {
            description: 'Lista de productos obtenida exitosamente',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
      post: {
        summary: 'Crear un nuevo producto',
        tags: ['Product'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del producto',
                },
                description: {
                  type: 'string',
                  description: 'Descripción del producto',
                },
                price: {
                  type: 'number',
                  description: 'Precio del producto',
                },
                count: {
                  type: 'integer',
                  description: 'Cantidad del producto',
                },
                image: {
                  type: 'string',
                  description: 'URL de la imagen del producto',
                },
              },
              required: ['name', 'description', 'price', 'count', 'image'],
            },
          },
        ],
        responses: {
          201: {
            description: 'Producto creado exitosamente',
          },
          400: {
            description: 'Solicitud inválida',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
    '/product/{id}': {
      get: {
        summary: 'Obtener un producto por su ID',
        tags: ['Product'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del producto a obtener',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Producto obtenido exitosamente',
          },
          404: {
            description: 'Producto no encontrado',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
      put: {
        summary: 'Actualizar un producto existente',
        tags: ['Product'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del producto a actualizar',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nuevo nombre del producto',
                },
                description: {
                  type: 'string',
                  description: 'Nueva descripción del producto',
                },
                price: {
                  type: 'number',
                  description: 'Nuevo precio del producto',
                },
                count: {
                  type: 'integer',
                  description: 'Nueva cantidad del producto',
                },
                image: {
                  type: 'string',
                  description: 'Nueva URL de la imagen del producto',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Producto actualizado exitosamente',
          },
          404: {
            description: 'Producto no encontrado',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
      delete: {
        summary: 'Eliminar un producto existente',
        tags: ['Product'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del producto a eliminar',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Producto eliminado exitosamente',
          },
          404: {
            description: 'Producto no encontrado',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
    '/session/login': {
      post: {
        summary: 'Iniciar sesión',
        tags: ['Session'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'Correo electrónico del usuario',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                },
              },
              required: ['email', 'password'],
            },
          },
        ],
        responses: {
          200: {
            description: 'Inicio de sesión exitoso',
          },
          401: {
            description: 'Credenciales inválidas o cuenta no activa',
          },
          404: {
            description: 'Cuenta no encontrada',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
    '/session/register': {
      post: {
        summary: 'Registrar un nuevo usuario',
        tags: ['Session'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del usuario',
                },
                lastName: {
                  type: 'string',
                  description: 'Apellido del usuario',
                },
                email: {
                  type: 'string',
                  description: 'Correo electrónico del usuario',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                },
                type: {
                  type: 'integer',
                  description: 'Tipo de cuenta (admin: 1, cliente: 2)',
                },
              },
              required: ['name', 'lastName', 'email', 'password', 'type'],
            },
          },
        ],
        responses: {
          201: {
            description: 'Usuario registrado exitosamente',
          },
          400: {
            description: 'Solicitud inválida o cuenta ya existente',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
    '/session/reset-password': {
      post: {
        summary: 'Restablecer contraseña',
        tags: ['Session'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'Correo electrónico del usuario',
                },
                newPassword: {
                  type: 'string',
                  description: 'Nueva contraseña',
                },
              },
              required: ['email', 'newPassword'],
            },
          },
        ],
        responses: {
          200: {
            description: 'Contraseña restablecida exitosamente',
          },
          404: {
            description: 'Cuenta no encontrada',
          },
          500: {
            description: 'Error interno del servidor',
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
