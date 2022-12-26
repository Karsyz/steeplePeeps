const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

module.exports = {
  sendEmail: async (req, res) => {

    // one time login link (incomplete)
    try {
      // get user from db from id in params
      const userTo = await User.findById(req.params.id);
      
      // send error if id doesn't exist
      if (userTo.id !== req.params.id) {
        res.send('Invalid ID')
        return;
      }
      
      // create jwt secret
      const secret = process.env.ACCESS_TOKEN_SECRET + userTo.password
      const payload = {
        email: userTo.email,
        id: userTo.id,
      }
      const token =  jwt.sign(payload, secret, {expiresIn: '5m'})
      const link = 'http://localhost:3000/update'
      // create a separate password update page for first time login?
      // get info from the link using req.params in the new page
      // 


    
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
      text: `Welcome To the ${req.user.name} Member Directory`, // plain text body
      html: `<h1>
              Welcome to the ${req.user.name} Member Directory
            </h1>
            <p>Access your account and change your password at 
              <a href="${link}">
                Steeple Peeps
              </a>
            </p>`, // html body
    });

    // Update Db - increase numOfEmailsSent by 1
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { numOfEmailsSent: 1 },
      }
    );

    console.log("Message sent: %s", info.messageId);

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    res.redirect("/dashboard");
      } catch (err) {
          console.log(err)
          res.redirect("/dashboard");
    }
  }
}
