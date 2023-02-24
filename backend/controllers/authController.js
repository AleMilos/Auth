const bcrypt = require("bcrypt");
const { generateToken, validatePassword } = require("../utils/authUtils");
const { asyncHandler } = require("../utils/generalUtils");
const User = require("../models/userModel");

/**
 **********************************************************************************************
 * REGISTER USER
 **********************************************************************************************
 */
const register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // If user attempting to register is not a Super User, reject
  if (res.req.user.role !== "Super") {
    res.status(403);
    throw new Error("Forbidden R1");
  }

  // If request fields are missing, reject
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing Fields R1");
  }

  // validate the password and get the array [Boolean, String]
  const passwordValidation = validatePassword(password);

  if (!passwordValidation[0]) {
    res.status(400);
    throw new Error(`${passwordValidation[1]}`);
  }

  // check if user with request email already exists...
  const alreadyExist = await User.findOne({ email });
  // ... if yes, reject
  if (alreadyExist) {
    res.status(400);
    throw new Error("User already exists R1");
  }

  // generate salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // hash the password with generated salt
  const hash = await bcrypt.hash(password, salt);

  // If user is attempting to make a super user, reject
  if (role === "Super") {
    res.status(401);
    throw new Error("Not Authorized R2");
  }

  // Create user in MongoDB
  const user = await User.create({
    email,
    hash,
    role: role ? role : "View",
    password: hash,
  });

  // Return userData without password and with a generated Token or, throw Error
  if (user) {
    res.status(200).json({
      message: "User Registered",
    });
  } else {
    res.status(401);
    throw new Error("Invalid User Credentials R1");
  }
});

/**
 **********************************************************************************************
 * LOGIN USER
 **********************************************************************************************
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // If request fields are missing, reject
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing Fields L1");
  }

  // Get user from DB
  const user = await User.findOne({ email });

  // If user not found... Reject
  if (!user) {
    res.status(401);
    throw new Error("Email or Password is incorrect L1");
  }

  // check if the request password is the same as the user password ...
  const passwordMatch = await bcrypt.compare(password, user.password);

  // ... if yes, return json object of the user ...
  if (passwordMatch) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    // ... else, reject
    res.status(401);
    throw new Error("Email or Password is incorrect L2");
  }
});

/**
 **********************************************************************************************
 * DELETE USER
 **********************************************************************************************
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // If request fields are missing, reject
  if (!email) {
    res.status(400);
    throw new Error("Missing Fields D1");
  }

  // check if the request is made by a Super user... if no reject
  if (res.req.user.role !== "Super") {
    res.status(401);
    throw new Error("Not Authorized D1");
  }

  // check if the requesting user is trying to delete himself, reject in case
  if (res.req.user.email === email) {
    res.status(403);
    throw new Error("Forbidden D2");
  }

  // find user in DB...
  const user = await User.findOne({ email });

  // ... if not found, reject
  if (!user) {
    res.status(400);
    throw new Error("User not found D1");
  }

  // check if the user to delete is another Super user, if yes, reject
  if (user.role === "Super") {
    res.status(403);
    throw new Error("Forbidden D1");
  }

  // find the user by the email, if found... delete ...
  const deletedUser = await User.findOneAndDelete({ email });

  if (deletedUser) {
    res.status(200).json({ message: "User Deleted" });
  } else {
    //... else, reject
    res.status(400);
    throw new Error("User not found D2");
  }
});

/**
 **********************************************************************************************
 * UPDATE PASSWORD
 **********************************************************************************************
 */
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // If request fields are missing, reject
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Missing Fields U1");
  }

  // Find user by the email of the requesting user
  const user = await User.findOne({ email: res.req.user.email });

  // compare the old password with the user password
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  // validate the password and get the array [Boolean, String]
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation[0]) {
    res.status(400);
    throw new Error(`Password ${passwordValidation[1]}`);
  }

  // if old password is equal to the user password ...
  if (passwordMatch) {
    // if new password is equal to the old password, reject...
    if (newPassword === currentPassword) {
      res.status(400);
      throw new Error("Use a new Password U1");
    }
    // ... else generate a salt with 10 rounds...
    const salt = await bcrypt.genSalt(10);
    // ... hash the password
    const hash = await bcrypt.hash(newPassword, salt);
    // update the user: find by email and update the password
    const updatedUser = await User.findOneAndUpdate(
      { email: res.req.user.email },
      { password: hash }
    );

    // if updatedUser is not found... reject
    if (!updatedUser) {
      res.status(400);
      throw new Error("User not found U1");
    }

    res.status(200).json({
      message: "Password Updated",
    });
  } else {
    // else ...( old password is not equal to new password)
    res.status(401);
    throw new Error("Not Authorized U1");
  }
});

module.exports = { register, login, deleteUser, updatePassword };
