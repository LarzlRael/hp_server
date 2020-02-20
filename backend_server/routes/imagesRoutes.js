const { Router } = require('express')
const router = Router();
const path = require('path');
const fs = require('fs');

// =============================
// rutas para poder ver las imagenes
// =============================


router.get('/:tipo/:img', (req, res) => {

    const { tipo, img } = req.params;

    const pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen)
    }
    else {
        // noimage.jpg
        const noimagen = path.resolve(__dirname, `../assets/noimage.jpg`);
        res.sendFile(noimagen);
    }
})


module.exports = router;
