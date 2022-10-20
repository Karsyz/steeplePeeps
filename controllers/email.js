const nodemailer = require("nodemailer");
const User = require("../models/User");

module.exports = {
  sendEmail: async (req, res) => {
    try {
    // get user from db from id in params
    const userTo = await User.findById(req.params.id);
    // console.log(userTo)
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.SERVER_EMAIL, 
        pass: process.env.SERVER_EMAIL_PSWD, 
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Karsy" <steeplepeeps100@gmail.com>', // sender address
      to: userTo.email, // list of receivers
      subject: `Welcome To the ${req.user.name} Member Directory`, // Subject line
      text: "Steeple Peeps", // plain text body
      html: `<h1>${req.user.name} Member Directory</h1><p>Make an account to access the directory at <a href="http://localhost:3000/">Steeple Peeps</a></p>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    res.redirect("/dashboard");
      } catch (err) {
          console.log(err)
          res.redirect("/dashboard");
    }
  }
}
