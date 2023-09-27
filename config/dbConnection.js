const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://chow:chow@cluster0.2py3xrd.mongodb.net/?retryWrites=true&w=majority');
    console.log(
      "Database connected: ",
     
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
