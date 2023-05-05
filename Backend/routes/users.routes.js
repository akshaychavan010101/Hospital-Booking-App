const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const db = require("../models/index");
const { authentication } = require("../middlewares/authentication");
const UserRouter = express.Router();

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

    res.send({
      msg: "Google authentication successful!",
      token: token,
      user: user,
    });
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
