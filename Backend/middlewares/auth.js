const auth = (passedRole) => {
  return (req, res, next) => {
    const { role } = req.user.dataValues;
    if (passedRole.includes(role)) {
      next();
    } else {
      res.status(401).send("Unauthorized access");
    }
  };
};

module.exports = {
  auth,
};
