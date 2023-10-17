const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password,role,phone } = req.body;
  if (!username || !email || !password || !role || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
    phone

  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

const getallusers = asyncHandler(async (req,res)=>{
  const users = await User.find()
  return res.json(users)
})

const getuser = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const user = await User.findOne({userId});
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
});
const updateuser = asyncHandler(async (req, res) => {
  const {userId} =  req.params
    const user = await User.findOne({userId});
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // if (user.email !== req.user.email) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other users");
  // }

  const updatedUser = await User.findOneAndUpdate(
  req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedUser);
});

const deleteuser = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const user = await User.findOne({userId});
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user contacts");
  // }
  await User.deleteOne({userId: req.params.userId});
  res.status(200).json(user);
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      "chowdeswari",
      { expiresIn: "1y" }
    );
    res.status(200).json({ accessToken });
    res.status(200).send({accessToken:token,message:"Logged in successfully"})

  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser,getallusers,updateuser,getuser,deleteuser};
