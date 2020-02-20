const { Router } = require('express')

const { verificateToken } = require('../middlewares/jsonVerification')

const router = Router();
//dbModel
const UsuarioModel = require('../models/usuariomodel');
//bcrypts

// =============================
// Metodo de indice xD
// =============================
const bcrypt = require('bcryptjs')
router.get('/user', (req, res) => {
    res.status(200).json('hola desde el enrutador de user :D')
})

// =============================
// Metodo para poder ver todos los usuarios
// =============================
router.get('/users', verificateToken, async (req, res) => {

    let desde = req.body.desde || 0;
    desde = Number(desde);

    try {
        const allUsers = await UsuarioModel.find({}, 'nombre email img role')
            .skip(desde)
            .limit(5);
        const count = await UsuarioModel.count();
        res.status(200).json({ users: allUsers, total: count, ok: true })
    } catch (error) {
        res.status(500).json({ error });
    }
})
// ========================
// Añadir un nuevo usuario
// ========================
router.post('/add-user', async (req, res) => {
    const { nombre, img, password, email, role } = req.body;
    const newUser = {
        nombre,
        img,
        //encriptando la contraseña
        password: bcrypt.hashSync(password, 10),
        email,
        role
    }

    const newU = new UsuarioModel(newUser);
    try {
        await newU.save();
        res.status(200).json({ status: 'ok', message: 'User added successfully' })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }

})

// ========================
// Actualizar usuario
// ========================

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UsuarioModel.findById(id);

    } catch (error) {
        res.status(400).json({ err: error, message: 'no se encontro ninguna coicidencia' })
    }

    const { nombre, img, email, role } = req.body;
    const newUser = {
        nombre,
        img,
        email,
        role
    }
    try {
        await UsuarioModel.findOneAndUpdate(id, newUser, { new: true, runValidators: true });
        res.status(400).json({ message: 'Usuario actulizado' })
    } catch (error) {
        res.status(400).json({ err: true, message: error })
    }



})

// =============================
// Eliminar un registro
// =============================

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UsuarioModel.findByIdAndDelete(id);
        if (!user) {
            res.status(200).json({ err: false, message: 'Usuario eliminado correctamente (fisicamente)' })
        } else {
            res.status(200).json({ err: false, message: 'no existe ese usuario' })
        }

    } catch (error) {
        res.status(400).json({ err: true, message: error })
    }

})

module.exports = router;