const { user, user2 } = require("../model/usrTbl");
const fs = require("fs");

const index = async (req, res) => {
  let myName = req.user
  await user
    .find({})
    .then((data) => {
      console.log('login successfully!!');
      return res.render("index", { data, myName });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const add = async (req, res) => {
  let { userName } = req.cookies;
  let myName = req.user
  return res.render("add",{ myName });
};

const create = async (req, res) => {
  const { name, description } = req.body;
  let id = req.body.id;
  if (id) {
    if (req.file) {
      let image = req.file.path;

      user
        .findById(id)
        .then((oneRecord) => {
          fs.unlinkSync(oneRecord.image);
        })
        .catch((err) => {
          console.log(err);
        });

      await user
        .findByIdAndUpdate(id, { name, description, image })
        .then((data) => {
          console.log("data updated");
          res.redirect("/");
        });
    } else {
      await user.findByIdAndUpdate(id, { name, description }).then((data) => {
        console.log("data updated");
        res.redirect("/");
      });
    }
  } else {
    let image = "";
    if (req.file) {
      image = req.file.path;
    }
    await user
      .create({ name, description, image })
      .then((data) => {
        console.log("data inserted..");
        return res.redirect("/create");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
};

const deleteData = async (req, res) => {
  let { id } = req.params;
  user
    .findById(id)
    .then((oneRecord) => {
      fs.unlinkSync(oneRecord.image);
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    await user.findByIdAndDelete(id);
    console.log("data deleted");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// user2

const create2 = async (req, res) => {
  try {
    const { name, password } = req.body;
    await user2.create({ name, password });
    console.log("data inserted..");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// const login = async (req, res) => {
//   const { name, password } = req.body;
//   let User = await user2.findOne({ name: name });
//   if (User) {
//     if (password == User.password) {
//       console.log("enter succesfully");
//       return res.cookie("userName", User.id).redirect("/");
//     } else {
//       console.log("wrong password");
//       return res.redirect("/login");
//     }
//   } else {
//     console.log("wrong Name");
//     return res.redirect("/login");
//   }
// };

const loginPage = async (req, res) => {
  return res.render("login");
};

const signin = async (req, res) => {
  await user2
    .find({})
    .then((data) => {
      return res.render("signin", { data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout =  (req, res) => {
  req.logOut((err)=>{
    if(err){
      console.log(err);
      return false;
    }
    console.log('logout Successfully');
    return res.redirect('/login')
  })
};

const data = async(req,res)=>{
  await user2.find({}).then((data)=>{
    return res.send(data)
  })
}

module.exports = {
  index,
  create,
  deleteData,
  add,
  create2,
  signin,
  logout,
  loginPage,
  data
};
