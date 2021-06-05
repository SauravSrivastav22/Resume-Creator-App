const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const app = require('express');
const fs = require('fs');

const path = require('path');
var multer = require('multer')
const nodemailer = require('nodemailer');

const session = require('express-session')
// app.use(express.static('./public'))

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    const { name, email, uploaded_image, password, cpassword } = req.body;

    async function main() {
        let transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // use TLS
            auth: {
                user: "srivastavsaurav22@gmail.com",
                pass: "Saurav@111"
            }
        });

        await transporter.sendMail({
            from: '"RCA " <srivastavsaurav22@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "TeamNoob from RCA", // Subject line
            html: "<b>Thanks For Registration, Now you Can Create a resume as you want, Best of luck For your Carrer. Thankyou..!</b>"


        });
    }

    


    db.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
        console.log(result);
        if (error) throw error;
        if (result.length > 0) {
            return res.render('register.hbs', {
                message: 'That email is alreay in use'
            });
        } else if (password !== cpassword) {
            return res.render('register.hbs', {
                message: 'Password does not match!'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        console.log(req.files.uploaded_image.name);
        if (!req.files) {
            return res.render('register.hbs', {
                message: 'Please Select a File'
            })
        }
        var file = req.files.uploaded_image;
        var img_name = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('public/images/upload_images/' + file.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query("INSERT INTO users SET ? ", { name: name, email: email, password: hashedPassword, image: req.files.uploaded_image.name }, (errr, result) => {
                    if (errr) {
                        console.log('mysql error ' + errr);
                    } else {
                        console.log(result);
                        // req.session.userId = req.body.email
                        const name = req.body.name;
                        const image = req.files.uploaded_image.name;
                        console.log(name);
                        req.session.userId = req.body.email;
                        console.log(req.session.userId);
                        // main().catch(console.error);
                        if (req.session.userId) {
                            main().catch(console.error);
                            return res.redirect('/home');
                        } else {
                            res.render('register.hbs');
                        }
                    }
                });
            })
        } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('register.hbs', { message: message });
        }
    })
}








exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('login.hbs', {
                message: 'Please Provide an Email and Password!'
            })
        }
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            console.log(result.length);
            if (result.length === 0) {
                return res.status(404).render('login.hbs', {
                    message: 'User not found'
                })
            }
            // || 
            if (!result || !(await bcrypt.compare(password, result[0].password))) {
                return res.status(401).render('login.hbs', {
                    message: 'Email or Password incorrect'
                });
            }
            else {
                const id = result[0].email;
                req.session.userId = id;
                if (req.session.userId) {
                    return res.redirect('/home')
                } else {
                    return res.redirect('/login')
                }
            }
        })

    } catch (err) {
        console.log(err);
    }

}













