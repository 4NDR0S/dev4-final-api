import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

import { manejarErrorArchivo } from './helper.js'

import { verifyToken, isAdmin} from './Midelware.js'

import { crearUsuario, logearUsuario, getUsuario, getAllUsuariosNoAdmins } from './models/UsuarioCtrl.js'

import { getIncidenciasByUsuario, getAllIncidencias, crearIncidencia, cambiarEstadoIncidencia } from './models/IncidenciaCtrl.js'


const app = express()
app.use(cors())

app.use(express.json())

// Ruta solo para crear usuario de manera local
app.post('/register', crearUsuario, manejarErrorArchivo)

// Ruta para logearse (cualquier usuario, incluyendo admin)
app.post('/login', logearUsuario)

// Ruta para obtener informacion del usuario
app.get('/me', verifyToken, getUsuario)

// Ver todos los usuarios que no son admins (solo admins)
app.get('/all-users', getAllUsuariosNoAdmins)



// Obtener las incidencias de un usuario una vez logeado
app.get('/incidencias', verifyToken, getIncidenciasByUsuario)

// Crear una incidencia una vez logeado
app.post('/incidencia', verifyToken, crearIncidencia)

// Obtener todas las incidencias (solo admins)
app.get('/all-incidencias', verifyToken, isAdmin, getAllIncidencias);

// Actualizar el estado de una incidencia (solo admins)
app.put('/incidencia/actualizar/estado', verifyToken, isAdmin, cambiarEstadoIncidencia)


app.listen(8081, ()=> {
  console.log("Server running on http://localhost:8081");
})