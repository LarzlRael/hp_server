const { Router } = require('express')

const { verificateToken } = require('../middlewares/jsonVerification')

const router = Router();
//dbModel   
const hospitalModel = require('../models/hospitalModel');

// =============================
// Metodo de indice xD
// =============================
router.get('/', (req, res) => {
    res.status(200).json('hola desde el enrutador de hospital :D')
})

// =============================
// Metodo para poder ver todos los hospitales
// =============================
router.get('/hospitales', verificateToken, async (req, res) => {
    let desde = req.body.desde || 0;
    desde = Number(desde);
    try {
        const Hospital = await hospitalModel.find()
            .populate('usuario', 'nombre email')
            .skip(desde)
            .limit(5);
        const count = await hospitalModel.count();
        res.status(200).json({ Hospital, ok: true, total: count });
    } catch (error) {
        res.status(500).json({ error });
    }
})
// ========================
// Añadir un nuevo hospital
// ========================
router.post('/add-hospital', verificateToken, async (req, res) => {
    const { nombre } = req.body;
    const id = req.usuario._id;
    const newH = {
        nombre,
        usuario: id
    }

    const newHospital = new hospitalModel(newH);
    try {
        await newHospital.save();
        res.status(200).json({ status: 'ok', message: 'Hospital added successfully' })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }

})

// ========================
// Actualizar usuario
// ========================

router.put('/edit/:id', verificateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await hospitalModel.findById(id);

    } catch (error) {
        res.status(400).json({ err: error, message: 'no se encontro ninguna coicidencia' })
    }

    const { nombre } = req.body;
    const usuario = req.usuario._id;
    const newUser = {
        nombre,
        usuario
    }
    try {
        await hospitalModel.findOneAndUpdate(id, newUser, { new: true, runValidators: true });
        res.status(400).json({ message: 'Hospital actualizado' })
    } catch (error) {
        res.status(400).json({ err: true, message: error })
    }
})

// =============================
// Eliminar un registro
// =============================

router.delete('/:id', verificateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await hospitalModel.findByIdAndDelete(id);
        if (!user) {
            res.status(200).json({ err: false, message: 'Hospital eliminado correctamente (fisicamente)' })
        } else {
            res.status(200).json({ err: false, message: 'no existe ese Hospital' })
        }

    } catch (error) {
        res.status(400).json({ err: true, message: error })
    }

})

module.exports = router;