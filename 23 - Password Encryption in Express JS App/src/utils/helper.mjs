import bcrypt from "bcrypt";

const saltRounds = 10;

// Hash the password using bcrypt
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);

  console.log(salt);

  return bcrypt.hashSync(password, salt);
};

// Compare the plain password with the hashed password
export const comparePassword = (plain, hashed) => {
  bcrypt.compareSync(plain, hashed);
};
