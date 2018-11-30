const nodemailer = require('nodemailer');
var passwordGenerator = require('generate-password');
var globleConstant = require('../shared/constant.js');

var sendEmail = {
        sendEmail: function (req, res, next) {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service : 'gmail',
                    port: 587,
                    secure: false,
                    auth: {
						user: "patientportalcm@gmail.com",
						pass: "aA@1234567"
                        
                    },
                    tls: {
                        ciphers: 'SSLv3'
                    }
                });

                // to generate default password.
                let password = passwordGenerator.generate({
                    length: 10,
                    numbers: true
                });

                // conversion of base64 user data into normal string.
                let buff = new Buffer(req.query.usrData, 'base64');
                let userData = JSON.parse(buff.toString('ascii'));

                // assign a final email body
                let finalEmailBody = globleConstant.EMAIL_BODY;
                finalEmailBody = finalEmailBody.replace('username',userData.name);
                finalEmailBody = finalEmailBody.replace('usercontractaddress',userData.contractAddress);
                finalEmailBody = finalEmailBody.replace('userpassword',password);
                
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'support@compumatrice.com',
                    to: userData.email,
                    cc: '',
                    subject: globleConstant.EMAIL_SUBJECT,
                    html: finalEmailBody // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error:-" + error);
                        res.send(error);
                        // return console.log(error);
                    } else {
                        info.defaultPassword = password;
                        console.log("info:-" + info)
                        res.send(info);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            });
        }
}

module.exports = sendEmail;