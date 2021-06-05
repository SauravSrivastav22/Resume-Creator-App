const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const upload = require('express-fileupload');
dotenv.config({ path: './.env' });
app.set('veiw engine', 'hbs');
const pathDirecoty = path.join(__dirname, './public')
console.log(__dirname);
app.use(express.static(pathDirecoty));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use(session({
  key: 'user_id',
  secret: 'max',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60000
  }

}))
app.use(upload());

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});



db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
// app.use((req,res,next)=>{
//   if(req.session.user){
//     res.redirect('/home')
//   }
//   next();
// })


// var sessionChecker = (req,res,next)=>{
//   if(req.session.user){
//     res.redirect('/home')
//   }else{
//     next();
//   }
// }


// app.post('/',(req,res)=>{
//   res.json(req.body)
// })
app.use('/', require('./routes/pages'));
// page
app.use('/auth', require('./routes/auth'))




app.listen(5002, () => {
  console.log('Server is running on the port 5002.....');
})

