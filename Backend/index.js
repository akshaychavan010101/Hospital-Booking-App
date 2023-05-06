const express = require("express");
const { UserRouter } = require("./routes/users.routes");
require("dotenv").config();
const db = require("./models/index");
const cors = require("cors");
const path = require("path");
// new code for google auth
const session = require("express-session");
const passport = require("passport");
const { connection } = require("./config/db");
const { v4: uuidv4 } = require("uuid");
const { AppointmentRouter } = require("./routes/appointments.routes");
// new code for github auth
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const jwt = require("jsonwebtoken");
const { DoctorRouter } = require("./routes/doctors.routes");

// ------------

const app = express();
app.use(express.json());
app.use(cors());

// ------------------ Google auth -----------------------
// Set up session (new code for google auth)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ---------------

app.use("/user", UserRouter);
app.use("/appointments", AppointmentRouter);
app.use("/doctors", DoctorRouter);

app.get("/",(req,res)=>{
  app.use(express.static(path.join(__dirname,"../", "client")));
  res.sendFile(path.resolve(__dirname,"../", "client","index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Welcome to the Hospital Booking App");
// });

// ------------------ Google auth -----------------------
// Set up Google authentication callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "send the link of register page",
  }),
  (req, res) => {
    try {
      // Redirect user to the home page after authentication
      res.redirect("https://jittery-shirt-tuna.cyclic.app/user/google-verify");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
);

// ------------------ Google auth ends-----------------------

// ----------------

// -------------------- gihub authentication starts  -------------------------
app.get("/auth/github", async (req, res) => {
  const { code } = req.query;

  try {
    const token = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }).then((res) => res.json());
    let Atoken = token.access_token;

    const userDetails = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${Atoken}`,
      },
    }).then((res) => res.json());

    // send the token to the frontend (email is needed because we are using email to authenticate the user to the protected routes)

    const { login, name, id } = userDetails;
    const user = {
      name,
      email: `${login}@gmail.com`,
      password: uuidv4(),
      mobile: "0000000000",
    };

    const isUserpresent = await db.user.findOne({
      where: {
        email: user.email,
      },
    });

    if (!isUserpresent) {
      await db.user.create(user);
    }

    const tosendtoken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7h",
      }
    );

    // save the user details in the database here

    res.send({
      msg: "Github authentication successful!",
      token: tosendtoken,
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// ------------------- github authentication ends -----------------------------

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log(
        `Server is running on port ${process.env.PORT} and connected to DB`
      );
    } catch (error) {
      console.log(error);
    }
  });
});
