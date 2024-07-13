const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");

function EmailWelcomePayload(userEmailAddress, church, link) {
  (this.from = '"Karsy" <steeplepeeps100@gmail.com>'),
    (this.to = userEmailAddress),
    (this.subject = `Welcome To the ${church} Member Directory`),
    (this.text = `Welcome To the ${church} Member Directory`),
    (this.html = `<h1>Welcome to the ${req.user.name} Member Directory</h1><p><a href="${link}">Use this link to access your account at Steeple Peeps.</a></p>`);
}

function EmailLoginPayload(userEmailAddress, link) {
  (this.from = '"Karsy" <steeplepeeps100@gmail.com>'),
    (this.to = userEmailAddress),
    (this.subject = `Login to Steeple Peeps`),
    (this.text = `Login to Steeple Peeps`),
    (this.html = `<h1>Login to Steeple Peeps</h1><p><a href="${link}">Use this link to access your account at Steeple Peeps.</a></p>`);
}

const emailLoginSubmit = async (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/emailLoginCheck");
  } else if (req.user.isAdmin) {
    res.redirect("/dashboard");
    // res.send({ status: 200, body: "email sent", ok: true });
  } else {
    res.redirect("/");
  }
};

const sendEmail = async (obj) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.OAUTH_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: process.env.EMAIL_SERVICE_TYPE,
        user: process.env.SERVER_EMAIL,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: obj.from,
      to: obj.to,
      subject: obj.subject,
      text: obj.text,
      html: obj.html,
    });
    console.log(info);
    return info;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  EmailLoginPayload,
  EmailWelcomePayload,
  emailLoginSubmit,
  sendEmail,
};
