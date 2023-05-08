const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const db = require("../models/index");
const { authentication } = require("../middlewares/authentication");
const UserRouter = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);

// new code for google auth
const passport = require("../oauths/google.oauth");
const { v4: uuidv4 } = require("uuid");

// Initialize Passport.js
UserRouter.use(passport.initialize());
UserRouter.use(passport.session());

// Set up Google authentication route (hit this to start the Google authentication process)
UserRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Set up routes (after the verification is done by hitting this route user will be redirected to the home page with the user details, also save the user details in the database here)
UserRouter.get("/google-verify", async (req, res) => {
  try {
    // check if the email is verified from the googel if not send error
    if (!req.user || !req.user.emails[0].verified || !req.user.id) {
      res.status(400).json({ msg: "Invalid access to route" });
      return;
    }

    const { displayName, emails } = req.user;

    const user = {
      name: displayName,
      email: emails[0].value,
      password: uuidv4(),
      mobile: "0000000000",
      role: "user",
    };

    // save the user details in the database here
    const userInDb = await db.user.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userInDb) {
      await db.user.create(user);
    }
    //  send the token to the frontend
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    // res.send({
    //   msg: "Google authentication successful!",
    //   token: token,
    //   user: user,
    // });
    // set the token , username in the cookie and redirect to the home page

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("userName", user.name, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/");
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// ------------------ google authentication  ends---------------------

// -------------------- gihub authentication ends  -------------------------

// -------------------- Normal routes -------------------------

UserRouter.post("/signup", async (req, res) => {
  const { name, email, password, mobile, role } = req.body;

  const hash = bcrypt.hashSync(password, 5);
  try {
    const user = await db.user.findOne({
      where: {
        email,
      },
    });

    if (user) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const data = await db.user.create({
      name,
      email,
      mobile,
      password: hash,
      role,
    });

    if (data) {
      const msg = {
        to: `${email}`,
        from: "sourabh.rajput.22082001@gmail.com", // Use the email address or domain you verified above
        subject: "find my doc",
        text: "hello customer for registering",
        html: `<div><h3 style="color:black">Welcome to Findmydoc</h3><p style="color: black; font-size: 10px;">Welcome to our website Findmydoc ! ${name} sir We are thrilled to have you here and look forward to providing you with valuable information, resources, and an engaging community. Whether you're here to learn something new, connect with like-minded individuals, or explore our offerings, we hope you'll find everything you need to make the most of your time here. Thank you for joining us, and we can't wait to see what you'll bring to our community!</p></div>`,
      };
      sgMail.send(msg).then(
        () => {
          console.log("data is send");
        },
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      res.status(201).json({ msg: "User created" });
    } else {
      res.status(500).json({ msg: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ msg: "User does not exist" });
      return;
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7h",
          }
        );

        res.status(200).json({
          token,
          userName: user.name,
        });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRouter.get("/userDetails", authentication, async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ msg: "User not found" });
      return;
    }
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRouter.get("/logout", authentication, (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRouter.get(
  "/all-users",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      const users = await db.user.findAll();
      res.status(200).json({
        users,
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

UserRouter.delete(
  "/delete-user/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.user.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        res.status(400).json({ msg: "User does not exist" });
        return;
      }

      await db.user.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ msg: "User deleted" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

UserRouter.put(
  "/update-user/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedValues = req.body;

      const user = await db.user.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        res.status(400).json({ msg: "User does not exist" });
        return;
      }

      await db.user.update(updatedValues, {
        where: {
          id,
        },
      });

      res.status(200).json({ msg: "User updated" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

UserRouter.get(
  "/all-admins",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      const admins = await db.user.findAll({
        where: {
          role: "admin",
        },
      });

      res.status(200).json({
        admins,
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

module.exports = {
  UserRouter,
};
