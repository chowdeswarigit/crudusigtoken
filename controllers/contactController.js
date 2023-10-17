// const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// asyncHandler(async (req, res) => {
//   const contacts = await Contact.find({ user_id: req.user.id });
//   res.status(200).json(contacts);
// });

const asyncHandler = require('../utils/Asynchandler')
 const CustomError =  require('../utils/CustomError')
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});


const getContacts = asyncHandler(async(req,res,next)=>{
  const contacts = await Contact.find()
  return res.json(contacts)
  console.log(next)
  

})

const getContact = asyncHandler(async (req, res,next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    const error = new CustomError('Contact with that ID is not found!', 404);
    return next(error);
   
   
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res,next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    const error = new CustomError('Contact with that ID is not found!', 404);
            return next(error);
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res,next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    const error = new CustomError('Movie with that ID is not found!', 404);
    return next(error);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
