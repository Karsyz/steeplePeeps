const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

function EmailWelcomePayload (userEmailAddress, church, link) {
  this.from = '"Karsy" <steeplepeeps100@gmail.com>',
  this.to = userEmailAddress,
  this.subject = `Welcome To the ${church} Member Directory`,
  this.text = `Welcome To the ${church} Member Directory`,
  this.html = `<h1>Welcome to the ${req.user.name} Member Directory</h1><p><a href="${link}">Use this link to access your account at Steeple Peeps.</a></p>`
}

function EmailLoginPayload (userEmailAddress, link) {
  this.from = '"Karsy" <steeplepeeps100@gmail.com>',
  this.to = userEmailAddress,
  this.subject = `Login to Steeple Peeps`,
  this.text = `Login to Steeple Peeps`,
  this.html = `<h1>Login to Steeple Peeps</h1><p><a href="${link}">Use this link to access your account at Steeple Peeps.</a></p>`
}

const emailLoginSubmit = async (req, res, next) => {
    if(req.user === undefined) {
      res.redirect('/emailLoginCheck');
    }else if(req.user.isAdmin)  {
      res.redirect('/dashboard');
    }else {
      res.redirect('/');
    }
}


const sendEmail = async (obj) => {
  // console.log(obj)
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    service: process.env.SERVER_EMAIL_SERVICE,
    host: process.env.SERVER_EMAIL_HOST,
    auth: {
      user: process.env.SERVER_EMAIL, 
      pass: process.env.SERVER_EMAIL_PSWD, 
      }
  })
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: obj.from,
      to: obj.to,
      subject: obj.subject,
      text: obj.text,
      html: obj.html,
    })  
    return info
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  EmailLoginPayload,
  EmailWelcomePayload,
  emailLoginSubmit,
  sendEmail,
  
}