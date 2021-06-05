// const  mysql = require('mysql2');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const app = require('express');
// const path = require('path');
// const nodemailer = require('nodemailer');
// const fileUpload = require('express-fileupload');
// const session = require('express-session')
// // app.use(express.static('./public'))
// const  db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database:process.env.DATABASE
//   });


// exports.register = (req,res)=>{
//     const {name, email,uploaded_image, password , cpassword} = req.body;

//     async function main() {
//         let transporter = nodemailer.createTransport({
//           pool: true,
//           host: "smtp.gmail.com",
//           port: 465,
//           secure: true, // use TLS
//           auth: {
//             user: "sahinreja511@gmail.com",
//             pass: "sahin@1997"
//           }
//         });

//           await transporter.sendMail({
//           from: 'ResumeGenerator " <sahinreja511@gmail.com>', // sender address
//           to: email, // list of receivers
//           subject: "TeamNoob from Rusume Creator", // Subject line
//           html:

//           `
//           <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
//     <title></title>
// </head>
// <body>
//     <div class="container">
//         <div class="card" style="1px solid #dddddd;padding:5px">
//             <div class="card-header p5 bg-seconday">
//                 <h3 class="text-center">ResumeGenerator</h3>
//             </div>
//             <div class="card-body">
//                 <p>Hi,</p>
//                 <p>You have successfully registered with us.Thanks for the registration and Welcome to ResumeGenerator.</p>
//                 <p>You can create here professional Resume.Quick go and create...</p>
//                 <i>Note:Create a Professional Resume to kick start the career</i>
//             </div>
//         </div>
//     </div>
// </body>
// </html>
//           `
//         });
//       }


//     db.query("SELECT * FROM users WHERE email = ?",[email] ,async (error,result)=>{
//         console.log(result);
//         if(error) throw error;
//         if(result.length > 0){
//             return res.render('register.hbs' ,{
//                 message:'That email is alreay in use'
//             });
//         }else if(password !== cpassword){
//             return res.render('register.hbs' , {
//                 message:'Password does not match!'
//             });
//         }
//         let hashedPassword = await bcrypt.hash(password , 8);
//         console.log(hashedPassword);    

//                      db.query("INSERT INTO users SET ? " , {name:name , email:email , password : hashedPassword, image :uploaded_image} , (errr,result)=>{
//                         if(errr){
//                             console.log(errr);
//                         }else{
//                             console.log(result);
//                             // req.session.userId = req.body.email
//                              const name =req.body.name;
//                              const image =req.body.image;
//                              console.log(name);
//                             req.session.userId = req.body.email;
//                             console.log(req.session.userId);
//                             // main().catch(console.error);
//                             if(req.session.userId){
//                                 main().catch(console.error);
//                                 return res.redirect('/home');
//                             }else{
//                                 return res.redirect('/');
//                             } 
//                         }
//                     });
//     })
// }

// exports.login = async (req,res) =>{
//     try{
//         const {email , password} = req.body;
//         if(!email || !password){
//             return res.status(400).render('login.hbs' , {
//                 message:'Please Provide an Email and Password!'
//             })
//         }
//             db.query("SELECT * FROM users WHERE email = ?" , [email],async (err,result)=>{
//                 console.log(result.length);
//                 if(result.length === 0){
//                     return res.status(404).render('login.hbs' , {
//                         message:'User not found'
//                     })
//                 }
//                 if(!result || !(await bcrypt.compare(password , result[0].password))){
//                     return res.status(401).render('login.hbs' , {
//                         message:'Email or Password incorrect'
//                     });
//                 }
//                 else{
//                     const id = result[0].email;
//                     req.session.userId = id;
//                     if(req.session.userId){
//                         return res.redirect('/home')
//                     }else{
//                         return res.redirect('/login')
//                     }
//                 }
//             })

//     }catch(err){
//         console.log(err);
//     }

// }




