/*const User = require("../models/user");

var multer = require('multer')
var fs = require('fs');
const { errorHandler } = require("../helpers/dbErrorHandler");
*/
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6421550",
  password: "JWDryI7EkB",
  port: "3306",
  database: "sql6421550"
});

//controller for saving signup details 
exports.signup = (req, res) => {
  console.log('controller: ', req.body);
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, email, address, phone) VALUES ('" + req.body.name + "','"+ req.body.email +"','"+ 
              req.body.address+"','"+ req.body.phone +"')";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

};

//controller for signin validation 
/*exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log("in signing: ", email, password)
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//controller for signing out
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
*/
exports.verifyJWT = (req, res) => {

  console.log(req.body.token)
  jwt.verify(req.body.token, process.env.JWT_SECRET.toString() , (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    else return res.json({user:user})
    //req.user = user
    //next() // pass the execution off to whatever request the client intended
    
  })

}


//controller for requiring signin
exports.requireSignin = expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ['RS256'] });


//controller for checking autherization
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

//controller to check admin access
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

//controller for server live/dead test
exports.root = (req, res) => {

  return res.json({ message: "Root for the project" });

}
/*
//Helper for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
    const { email } = req.body;
    //console.log(" desti ", req.body)
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        //return res.status(400).json({
          //error: "User with that email does not exist. Please signup",
        //});
        console.log("error user not find")
      }

      //console.log(user._id)
      var dir = 'public/'+user._id;

      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }

      cb(null, dir)

    });
    
      //cb(null, "public")
      
    },
    filename: function (req, file, cb) {
      
      try {
        var names = JSON.parse(req.body.names) 
      } catch (error) {
        console.log(error)
      }
      var regexAll = /[^\\]*\.(\w+)$/;
      var total = file.originalname.match(regexAll);
      var extension = total[1];
      //console.log("filname:", names[file.originalname])
      
      cb(null, names[file.originalname]+"."+extension)
    }
  })

//Helper for file upload specifies multiple files expected
var upload = multer({ storage: storage }).array('file')

//Controller for file upload 
exports.fileUpload =  (req, res) => {
    
    upload(req, res, function (err) {

        //console.log('asd', req.files)

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 
        
        //store file meta data to db

        return res.status(200).send(req.file)
        // Everything went fine.
      })
};

/*
exports.downloadAgreement = (req, res) => {

  res.download('resources/sample_agreement.docx'); 

};
*/