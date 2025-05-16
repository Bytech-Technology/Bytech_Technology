const fs = require('fs');
const path = require('path');
const nodemailer = require('./nodeMailer');

// Ruta al archivo JSON
const dataPath = path.join(__dirname, '..', 'data', 'Data.json');

// Función para cargar el archivo JSON
function loadData(callback) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseError) {
            callback(parseError, null);
        }
    });
}

// Función para cargar archivos JSON de idioma
const loadLanguage = (lang) => {
    const filePath = path.join(__dirname, '..', 'i18n', `${lang}.JSON`);
    console.log(`Cargando archivo de idioma desde: ${filePath}`);
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } else {
            console.error(`Archivo de idioma no encontrado: ${filePath}`);
            return null;
        }
    } catch (err) {
        console.error(`Error al cargar archivo de idioma: ${err.message}`);
        return null;
    }

};

// Definir las rutas
module.exports = function (app) {
    app.get('/:lang?', (req, res) => {
        // Verificar si se proporciona un parámetro de idioma
        if (!req.params.lang) {
            // Si no hay parámetro de idioma, redirigir a español ('ES')
            return res.redirect('/ES');
        }

        const lang = req.params.lang;
        const languageData = loadLanguage(lang);
        if (!languageData) {
            return res.status(404).send('Language not found');
        }

        loadData((err, jsonData) => {
            if (err) {
                console.error('Error al cargar los datos:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.render('index', { clients: jsonData, lang: languageData, idioma: lang });
        });
    });
    
    app.post('/submit-contact', nodemailer.submitContact);
};
