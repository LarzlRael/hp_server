const mongoose = require('mongoose');

//mongodb://192.34.58.159/hospitalDB 
mongoose.connect('mongodb://192.34.58.159/hospitalDB', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true

})
    .then(db => console.log('Base de datos contectada'))
    .catch(err => console.log(err))