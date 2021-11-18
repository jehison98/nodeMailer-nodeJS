const express = require('express');
const cors = require('cors');

const app = express();

const nodeMailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

const url = 'https://jehison98.github.io/JehisonGB-Portafolio/';
const whiteList = [url];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not Allowed by CORS'))
        }
    }
}


const email = 'jehisondeveloper@gmail.com'
const emailPass = 'rixqzheafqynmjbl';
app.post('/', (req, res) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.email",
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: email, // generated ethereal user
            pass: emailPass, // generated ethereal password
        },
    });

    const mailOptions = {
        from: req.body.email,
        to: "jehison3009@gmail.com",
        subject: `Message from ${req.body.name}`,
        html: `
        <p>
            Name: ${req.body.name} <br>
            Email: ${req.body.email} <br>
            Phone: ${req.body.phone}
        </p> 
        <p>
            Message: ${req.body.message}
        </p>
            
        `,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(true);
        }
    });


});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
