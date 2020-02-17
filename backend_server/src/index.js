const express = require('express');
const app = express();

const routes = require('./routes/indexRoutes')



//rutas
app.use(routes);


// Escuchar en nuestro servidor

app.listen(3000, () => {
    console.log('Express en el puerto \x1b[32m%s\1xb[0m http://localhost:3000')
})