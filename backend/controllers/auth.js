const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  const { userName, email, password } = req.body;
  User.findOne({ email }, (err, doc) => {
    if (err) {
      return res.status(500).json({
        error: "server error",
      });
    } else if (doc) {
      return res.status(400).json({
        error: "User already exist,please login",
      });
    } else {
      User.findOne({ userName }, { userName: 1 }, (err, doc) => {
        if (err) console.log(err);
        else if (doc) {
          return res.status(400).json({
            error: "Username already taken",
          });
        } else {
          const newUser = new User({ userName, email, password });
          bcrypt.genSalt(10, (err, salt) => {
            if (err) console.log(err);
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.log(err);
              newUser.password = hash;
              newUser.save((err, doc) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({
                    error: "internal server error",
                  });
                } else if (doc) {
                  return res.status(200).json({
                    status: "ok",
                  });
                }
              });
            });
          });
        }
      });
    }
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, doc) => {
    if (err) console.log(err);
    else if (!doc) {
      return res.status(400).json({
        error: "Account not found",
      });
    } else if (doc) {
      bcrypt.compare(password, doc.password, (err, isMatch) => {
        if (err) console.log(err);
        else if (isMatch) {
          const expiration = 604800000;
          const token = jwt.sign(
            { id: doc._id, userName: doc.userName },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          res.cookie("token", token, {
            expires: new Date(Date.now() + expiration),
            secure: false, // change later when using https
            httpOnly: true,
          });

          return res.json({
            status: "ok",
            user: {
              id: doc._id,
              userName: doc.userName,
            },
          });
        } else {
          return res.status(401).json({
            error: "Incorrect email or password",
          });
        }
      });
    }
  });
};
exports.signOut = (req, res) => {
  res.clearCookie("token");
  return res.json({
    status: "ok",
  });
};

exports.isSignedIn = (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json({
        error: "Unathorised",
      });
    }
    const decrypt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
      userName: decrypt.userName,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Can't authorise",
    });
  }
};

exports.getUserData = (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      req.userData = null;
      next();
    } else {
      const decrypt = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = {
        id: decrypt.id,
        userName: decrypt.userName,
      };

      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Can't authorise",
    });
  }
};
