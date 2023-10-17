const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const CustomError = require('./utils/CustomError')
const globalErrorHandler = require('./controllers/errorController')

mailer = require('nodemailer');
const cron = require('node-cron') 
const ContactRoute  =  require('./routes/contactRoutes')
const 
smtpProtocol = mailer.createTransport({
  service: "Gmail",
  auth: {
      user: "chowdeswari599@gmail.com",
      pass: "lgddkydfewdntfmu"
  }
});

var commonMailOptions = {
  from: "chowdeswri599@gmail.com",
  subject: "Test Mail",
  html: `Hello`
}
const recipients = [
  'chowdeswari599@gmail.com',
  'poojithajv15@gmail.com',
  'chowdeswari.p@kloctechnologies.com',
  // Add more recipient email addresses here
];
recipients.forEach((recipient) => {
  const mailOptions = {
    ...commonMailOptions,
    to: recipient,
  };

  // Send the email


 cron.schedule('30 12 * * *' ,()=>{

smtpProtocol.sendMail(mailOptions, (error, info) => {
        if (error) {
           console.error(`Error sending email to ${recipient}:`, error);
         } else {
           console.log(`Email sent to ${recipient}:`, info.response);
         }
      });
    });
 })


connectDb();
const app = express();

const port = process.env.PORT || 5000;


app.use(express.json());
app.use("/api/contacts", ContactRoute);
app.use("/api/users", require("./routes/userRoutes"));
app.all("*", (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
