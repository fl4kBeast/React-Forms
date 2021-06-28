const express = require("express");
var fs = require('fs');
var multer = require('multer')
var upload = multer();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
//const assignmentRoutes = require("./routes/assignment");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const braintreeRoutes = require("./routes/braintree");
// const orderRoutes = require("./routes/order");

// app
const app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6421550",
  password: "JWDryI7EkB",
  port: "3306",
  database: "sql6421550"
});

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers ( name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), phone int )";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/



// middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


app.get('/', (req, res) => {
    res.send('root for the project')
})

// routes middleware
app.use("/api", authRoutes);
//app.use("/api", assignmentRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", braintreeRoutes);
// app.use("/api", orderRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



