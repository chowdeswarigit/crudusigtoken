const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId:{
type:String
    },
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    role:{
      type:String,
      required:true
    },
    phone:{
      type:Number,
required:true
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // If the document is not new (i.e., it's an update), don't generate a new user ID
    return next();
  }

  try {
    // Find the highest numeric user ID in the collection
    const highestUserIdDocument = await this.constructor.findOne({}, { userId: 1 }, { sort: { userId: -1 } });

    // Calculate the next user ID
    let nextUserIdNumber = 1;
    if (highestUserIdDocument && highestUserIdDocument.userId) {
      // Extract the numeric part of the user ID and increment it
      const lastUserIdNumber = parseInt(highestUserIdDocument.userId.split('_')[1]);

      nextUserIdNumber = lastUserIdNumber + 1;
    }

    // Format the user ID as "userId_0001"
    const formattedUserId = `userId_${nextUserIdNumber.toString().padStart(4, '0')}`;

    // Assign the formatted user ID to the document
    this.userId = formattedUserId;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
