const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");
const { db } = require("../db/firebaseDb.js");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    username,
    email,
    password: hashedPassword,
  };

  db.collection("users")
    .add(newUser)
    .then((docRef) => {
      res.status(201).json("User created Successfully");
    })
    .catch((error) => {
      next(error);
    });
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return next(errorHandler(404, "User not found"));
        } else {
          snapshot.forEach((doc) => {
            //get the user
            // console.log("user found", doc.id, "=>", doc.data());

            const validPassword = bcrypt.compareSync(
              password,
              doc.data().password
            );

            if (!validPassword)
              return next(errorHandler(401, "Wrong Credentials"));
            const token = jwt.sign(
              { id: doc.data().email },
              process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = doc.data();
            res
              .cookie("access_token", token, { httpOnly: true })
              .status(200)
              .json(rest);
          });
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    db.collection("users")
      .where("email", "==", req.body.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);

          const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

          const newUser = {
            username:
              req.body.username.split(" ").join("").toLowerCase() +
              Math.random().toString(36).slice(-4),
            email: req.body.email,
            password: hashedPassword,
          };

          //code to save it
          db.collection("users")
            .add(newUser)
            .then((docRef) => {
              const token = jwt.sign(
                { id: newUser.email },
                process.env.JWT_SECRET
              );
              const { password: pass, ...rest } = newUser;

              res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
            })
            .catch((error) => {
              next(error);
            });
        } else {
          snapshot.forEach((doc) => {
            //get the user
            // console.log("user found", doc.id, "=>", doc.data());
            const token = jwt.sign(
              { id: doc.data().email },
              process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = doc.data();
            res
              .cookie("access_token", token, { httpOnly: true })
              .status(200)
              .json(rest);
          });
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, signout, google };
