require('dotenv').config();
const nodemailer = require('nodemailer');

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Coloca aquí tu correo electrónico
        pass: process.env.EMAIL_PASS // Coloca aquí tu contraseña
    }
});

// Función para enviar el correo electrónico de contacto
function submitContact(req, res) {
    const { name, email, message } = req.body;

    // Configura el correo electrónico a enviar
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.SEND_USER,
        subject: 'Nuevo mensaje de contacto',
        html: `
            <div style="background:black; height: 100%;padding:1rem 2rem;">
                <h2 style="color: #AE60E6; text-align: center;">¡Nuevo mensaje de contacto recibido!</h2>
                <p style="color: #fff; text-align: center;">El usuario <span style="color: #AE60E6;">${name} </span> con correo ${email}, quiere ponerse en contacto con nosotros</p>
                <p style="color: #fff;  text-align: center;"><span style="color: #AE60E6;">asunto:</span> ${message}</p>
                <div style="magin:1rem auto;padding:3rem 0;">
                    <span style="color:#7c7a7a;text-align: center;display:block;">© 2024 Bytech Company</span>
                </div>
            </div>
        `
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('Error al enviar el mensaje.');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('¡Gracias por tu mensaje! Se ha enviado correctamente. :D');
        }
    });
}

module.exports = { submitContact };
