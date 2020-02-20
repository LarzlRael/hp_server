const express = require('express');
const app = express();
require('./database/mongodb');
const routes = require('./routes/indexRoutes')
const users = require('./routes/usuarioRoutes')
const login = require('./routes/login');
const hospitales = require('./routes/hospitalRoutes');
const medicos = require('./routes/medicosRoute');
const busqueda = require('./routes/busquedaRoutes');
const upload = require('./routes/uploadRoutes');
const view = require('./routes/imagesRoutes');
//path  
const path = require('path');

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//server index config

// const serverIndex = require('serve-index');
// app.use(express.static(__dirname + '/'));
// app.use('/uploads', serverIndex(__dirname, +'uploads'));

//rutas

app.use(routes);
app.use(users);
app.use('/hospital', hospitales);
app.use('/medicos', medicos);
app.use('/busqueda', busqueda);
app.use('/uploads', upload);
app.use('/view', view);

//login
app.use(login);


//public 

// Escuchar en nuestro servidor

app.listen(3000, () => {
    console.log('Express en el puerto http://localhost:3000')
});