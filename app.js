const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

// Configuración del servidor
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('assets/'));

// Importar las rutas
require('./routes/routes')(app);
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
// Exportar la app para Vercel
module.exports = app;