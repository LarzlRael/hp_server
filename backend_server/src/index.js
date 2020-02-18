const express = require('express');
const app = express();
require('./database/mongodb');
const routes = require('./routes/indexRoutes')
const users = require('./routes/usuarioRoutes')
const login = require('./routes/login');


//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas
app.use(routes);
app.use(users);
app.use(login);


// Escuchar en nuestro servidor

app.listen(3000, () => {
    console.log('Express en el puerto http://localhost:3000')
})