// IncidenciaCtrl.js
import { pool } from '../config/db.js'

// Función para obtener todas las incidencias de un usuario
export const getIncidenciasByUsuario = async (req, res) => {
    try {
        const idUsuario = req.user.usuarioId;
        const [incidencias] = await pool.execute(
            'SELECT * FROM incidencias WHERE id_usuario = ?',
            [idUsuario]
        );
        res.json(incidencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener incidencias' });
    }
};

// Función para obtener todas las incidencias (solo para admins)
export const getAllIncidencias = async (req, res) => {
    try {
        const [incidencias] = await pool.execute('SELECT * FROM incidencias');
        res.json(incidencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener todas las incidencias' });
    }
};

// Función para crear una incidencia
export const crearIncidencia = async (req, res) => {
    try {
        const { titulo, descripcion, tipoIncidencia } = req.body;
        if (!titulo || !descripcion) {
            return res.status(400).json({ error: 'Título y descripción son requeridos' });
        }

        // Obtiene el ID de usuario logeado
        const usuarioId = req.user.usuarioId;
        const estado = 'emitida'

        // Crea una nueva incidencia
        const query = 'INSERT INTO incidencias (titulo_incidencia, descripcion, id_usuario, estado, tipo_incidencia, fecha_incidencia) VALUES (?, ?, ?, ?, ?, NOW())';
        const values = [titulo, descripcion, usuarioId, estado, tipoIncidencia];
        await pool.execute(query, values);

        res.json({ message: 'Incidencia creada con éxito' });
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        res.status(500).json({ error: 'Error al crear incidencia' });
    }
};


// Ruta para cambiar el estado de una incidencia (solo accesible para administradores)
export const cambiarEstadoIncidencia = async (req, res) => {
    try {
        // Obtener el ID de la incidencia y el nuevo estado
        const { idIncidencia, nuevoEstado } = req.body;
        if (!idIncidencia || !nuevoEstado) {
            return res.status(400).json({ error: 'ID de incidencia y nuevo estado son requeridos' });
        }

        // Verificar si el nuevo estado es válido
        const estadosValidos = ['emitida', 'en_proceso', 'resuelta', 'cerrada'];
        if (!estadosValidos.includes(nuevoEstado)) {
            return res.status(400).json({ error: 'Nuevo estado no es válido' });
        }

        // Actualizar el estado de la incidencia
        const query = 'UPDATE incidencias SET estado = ? WHERE id_incidencia = ?';
        const values = [nuevoEstado, idIncidencia];
        await pool.execute(query, values);

        res.json({ message: 'Estado de la incidencia actualizado con éxito' });
    } catch (error) {
        console.error('Error al cambiar estado de incidencia:', error);
        res.status(500).json({ error: 'Error al cambiar estado de incidencia' });
    }
};