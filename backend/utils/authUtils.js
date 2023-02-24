const jsonwebtoken = require("jsonwebtoken");

/**
 *  @param {String} id
 *  @returns {String} token
 *
 * Generates a token from a user _id.
 * Uses the sign() method of the jsonwebtoken library
 * Sets an expiration date of the given token
 */
const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.SECRET, {
    expiresIn: "30d",
  });
};

/**
 *
 * @param {String} password
 * @returns {Array: [Boolean, String]}
 *
 * Returns an array containing a Boolean. If the Boolean is false, the array has also a string of the error
 */
const validatePassword = (password) => {
  const minCharacters = 8;
  if (password.length < minCharacters) {
    return [false, `The password needs at least ${minCharacters} characters`];
  }
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;
  let hasWhiteSpace = false;

  for (const char of password) {
    if (char.match(/[A-Z]/)) hasUpper = true;
    else if (char.match(/[a-z]/)) hasLower = true;
    else if (char.match(/[0-9]/)) hasNumber = true;
    else if (char.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) hasSymbol = true;
    else if (char.match(/' '/)) hasWhiteSpace = true;
  }

  if (hasUpper && hasLower && hasNumber && hasSymbol && !hasWhiteSpace) {
    return [true];
  } else {
    if (!hasUpper)
      return [false, "The password needs at least one Upper case letter"];
    else if (!hasLower)
      return [false, "The password needs at least one Lower case letter"];
    else if (!hasNumber)
      return [false, "The password needs at least one Number"];
    else if (!hasSymbol)
      return [false, "The password needs at least one Symbol"];
    else if (hasWhiteSpace)
      return [false, "The password can't have white spaces"];
  }
};

module.exports = { generateToken, validatePassword };
