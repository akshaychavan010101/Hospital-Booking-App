const jwt = require("jsonwebtoken");
const db = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findOne({
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
    console.log(error);
    res.status(401).json({msg : "Unauthenticated user"});
  }
};

module.exports = { authentication };
