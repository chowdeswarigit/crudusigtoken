mailer = require('nodemailer');

const cron  =  require('node-cron')

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
   
 
  cron.schedule("* * * * * * " ,task())
  
// cron.schedule('46 * * * *' ,()=>{
  
// smtpProtocol.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error(`Error sending email to ${recipient}:`, error);
//         } else {
//           console.log(`Email sent to ${recipient}:`, info.response);
//         }
//       });
//     });
})




