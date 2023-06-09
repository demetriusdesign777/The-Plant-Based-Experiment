const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

var accessToken = null;
const oAuth2Client = new OAuth2Client(
  process.env.clientId,
  process.env.clientSecret,
  process.env.redirectURI
);
oAuth2Client.setCredentials({ refresh_token: process.env.refreshToken });

async function mailer(requestbody) {
  accessToken = await oAuth2Client.getAccessToken();

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "webplayground777@gmail.com",
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: accessToken
    }
  });

  var mailOptions = {
    from: `The Plant Based Experiment <webplayground777@gmail.com>`,
    to: requestbody.email,
    subject: "Hi " + requestbody.username,
    text:
      "Thank you for signing up to our email newsletter. This is email is just for testing purposes you will not receive a newsletter."
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = mailer;
