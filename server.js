const express = require('express');
const app = express();

const nodeMailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hola");
});

app.post('/', (req, res) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.email",
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'jehison3098@gmail.com', // generated ethereal user
            pass: 'ukyvysqtsrgvzafh', // generated ethereal password
        },
    });

    const mailOptions = {
        from: req.body.email,
        to: "jehison3098@gmail.com",
        subject: `Message from ${req.body.name}`,
        html: `
        <p>${req.body.name}</p> <br> 
        <p>${req.body.email}</p> <br> 
        <p>${req.body.phone}</p> <br> 
        <p>${req.body.message}</p> <br> 
        `,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Message sent");
        }
    });


});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
