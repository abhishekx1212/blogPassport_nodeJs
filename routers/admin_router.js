const { Router } = require("express");
const multer = require("multer");
const {
  index,
  create,
  deleteData,
  add,
  create2,
  signin,
  logout,
  loginPage,
  data,
} = require("../controllers/admin_controller");
const { authentication, isAuth, userAuth } = require("../middleware/middleware");
const passport = require('passport');
const adminrouter = Router();

const imageUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: imageUpload }).single("image");

adminrouter.get("/",isAuth, index);

adminrouter.get("/create", add);

adminrouter.post("/create2",userAuth, create2);

adminrouter.get("/data",data)

adminrouter.post("/create",upload,authentication, create);

adminrouter.get("/delete/:id", deleteData);

adminrouter.get("/signin", signin);

adminrouter.get("/logout", logout);

adminrouter.get("/login",loginPage);

adminrouter.post("/local",passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login'
}));

module.exports = adminrouter;