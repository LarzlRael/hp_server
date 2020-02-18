const { Router } = require('express')
const router = Router();
const jwt = require('jsonwebtoken');
//dbModel
const UsuarioModel = require('../models/usuariomodel');
//bcrypts
const bcrypt = require('bcryptjs')
//config 
const { SEED } = require('../config/config');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userdb = await UsuarioModel.findOne({ email });
    if (userdb) {
        // res.status(200).json(userdb);
        console.log(password, userdb.password);
        if (!bcrypt.compareSync(password, userdb.password)) {
            return res.status(400).json({ err: true, message: 'credenciales incorrectas' })
        } else {
            //return res.status(400).json({ err: true, message: 'Bienvenido prro' })
            //crear token
            userdb.password = ':)';
            const token = jwt.sign({ usuario: userdb }, SEED, {
                expiresIn: 14400
            })
            return res.status(200).json({ err: true, message: token })
        }


    } else if (!userdb) {
        return res.status(400).json({ err: true, message: 'credenciales incorrectas' })
    }
})

// =============================
// Verficar Token
// =============================

router.use('/', (req, res, next) => {
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'token incorrecto',
                err
            })
        }
    })
})
module.exports = router;