const express = require("express");
const router = express.Router();

const {
  signup,
  root,
  verifyJWT,
} = require("../controllers/auth");
//const { userSignupValidator } = require("../validator");



//router.post("/signup", userSignupValidator, signup);
router.post("/signup", signup);
//router.get("/signout", signout);
router.get("/root", root)
//router.post("/upload",  fileUpload)
router.post("/verifyJWT", verifyJWT)

module.exports = router;
