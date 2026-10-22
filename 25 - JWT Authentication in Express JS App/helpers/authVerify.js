const { tokenValidator } = require("./token");

module.exports = async function (req, res, next) {
  try {
    const { jwt } = req.cookies;
    const valid = await tokenValidator(jwt);

    if (valid) {
      next();
    } else {
      res.status(401).send({ msg: "Access Denied" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
