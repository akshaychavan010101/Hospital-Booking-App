const jwt = require("jsonwebtoken");
// const db = require("../models/index");
const { User } = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({msg : "Unauthenticated user"});
  }
};

module.exports = { authentication };