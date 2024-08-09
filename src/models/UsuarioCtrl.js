import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import { DB_SECRET_KEY } from '../config/config.js'


// funcion para encontrar usuario por su id
const findUsuarioByUser = async (user) => {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE user = ?', [user]);
    return rows[0];
};


//funcion para obtener el usuario
const verifyUsuario = async (id) => {
    const [usuario] = await pool.execute(
        'SELECT id_usuario, user, name, rol, apartamento FROM usuarios WHERE id_usuario = ?',
        [id]
    );
    return usuario[0];
};



// Crear usuario
export const crearUsuario = async (req, res) => {
    const { user, password, name, apartamento } = req.body
    if (!user || !password) {
        return res.status(400).json({ error: 'User and password are required' })
    }

    try {
        // Verificar si el user ya existe
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE user = ?', [user])
        if (rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const [result] = await pool.execute('INSERT INTO usuarios (user, password, name, apartamento) VALUES (?, ?, ?, ?)', [user, hashedPassword, name, apartamento])

        // Acceder al insertId del resultado
        const newUser = {
            id_usuario: result.insertId,  // Asegúrate de que insertId está disponible en el resultado
            user,
            password: hashedPassword,
            name,
            apartamento
        }
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error al crear usuario:', error)
        res.status(500).json({ error: 'Error al crear usuario' })
    }
}

// Logear usuario
export const logearUsuario = async (req, res) => {
    try {
      const { user, password } = req.body;
      if (!user || !password) {
        return res.status(400).json({ error: 'User and password are required' });
      }
  
      // Busca al usuario en la base de datos utilizando el nombre de usuario
      const usuarioEncontrado = await findUsuarioByUser(user);
      if (!usuarioEncontrado) {
        return res.status(401).json({ error: 'Invalid user or password' });
      }
  
      // Compara la contraseña proporcionada con la almacenada en la base de datos
      const isMatch = await bcrypt.compare(password, usuarioEncontrado.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid user or password' });
      }
  
      // Genera un token de autenticación que incluye el rol del usuario
      const payload = {
        usuarioId: usuarioEncontrado.id_usuario,
        rol: usuarioEncontrado.rol, // Agrega el rol del usuario al payload
      };
      const token = jwt.sign(payload, DB_SECRET_KEY, { expiresIn: '30m' });
      res.json({ token });
    } catch (error) {
      console.error('Error al logear usuario:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  };


// obtener usuario
export const getUsuario = async (req, res) => {
    try {
        const usuario = await verifyUsuario(req.user.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener información del usuario' });
    }
};


// Si deseas seleccionar usuarios que no sean administradores, puedes modificar la consulta de la siguiente manera:
export const getAllUsuariosNoAdmins = async (req, res) => {
  try {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios WHERE rol != "admin"');
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener todos los usuarios no administradores' });
  }
};