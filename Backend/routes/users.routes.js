const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const db = require("../models/index");
const { user } = require("../models/index");
const { authentication } = require("../middlewares/authentication");

const UserRouter = express.Router();


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
      res.status(400).send("User already exists");
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
      res.status(201).send("User created");
    } else {
      res.status(500).send("Something went wrong");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
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
      res.status(400).send("User does not exist");
      return;
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          {
            id: user.id,
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
        res.status(400).send("Invalid credentials");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

UserRouter.get("/userDetails", authentication, async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).send("User not found");
      return;
    }
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

UserRouter.get("/logout", authentication, (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
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
      res.status(500).send("Something went wrong");
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
        res.status(400).send("User does not exist");
        return;
      }

      await db.user.destroy({
        where: {
          id,
        },
      });

      res.status(200).send("User deleted");
    } catch (error) {
      res.status(500).send("Something went wrong");
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
        res.status(400).send("User does not exist");
        return;
      }

      await db.user.update(updatedValues, {
        where: {
          id,
        },
      });

      res.status(200).send("User updated");
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = {
  UserRouter,
};
