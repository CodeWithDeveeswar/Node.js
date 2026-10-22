const jwt = require("jsonwebtoken");

const tokenGenerator = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_KEY, {
    expiresIn: "3hours",
  });
  return token;
};

const tokenValidator = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data;
  } catch (error) {
    return false;
  }
};

const resetTokenGenerator = (email) => {
  const token = jwt.sign(
    { email, purpose: "password-reset" },
    process.env.JWT_KEY,
    { expiresIn: "10m" },
  );
  return token;
};

const resetTokenValidator = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);

    if (data.purpose !== "password-reset") {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};

module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenValidator = tokenValidator;
module.exports.resetTokenGenerator = resetTokenGenerator;
module.exports.resetTokenValidator = resetTokenValidator;
