const jwt = require("jsonwebtoken");
const db = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new Error();
    }

    delete user.dataValues.password;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Unauthenticated user");
  }
};

module.exports = { authentication };
