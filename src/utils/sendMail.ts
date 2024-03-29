import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import nodemailer from "nodemailer";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendForgotPasswordMail = async (mailPayload: any) => {
    const textMail = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
          font-size: 24px;
          margin-bottom: 20px;
        }
        p {
          color: #777777;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Forgot Password</h1>
        <p>Your Password Reset Pin is ${mailPayload.pin}</p>
        <a class="button" href="#">Reset Password</a>
      </div>
    </body>
    </html>
    `;    
    const msg = {
        to: mailPayload.to,
        from: 'madukaifeol@gmail.com', // Change to your verified sender
        subject: mailPayload.subject,
        html: textMail,
    };
    console.log("mail-msg: ", msg);
  try {                        
    console.log("mailpayload: ", mailPayload);
    console.log("mail-msg: ", msg);
    
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  } catch (error) {
    console.error(error);
  }
};

const sendCredential = async (mailPayload: any) => {
    const textMail = `<!DOCTYPE html>
    <html>
    <head>
      <style>
      body {
        font-family: Arial, sans-serif;
    }
    
    .header {
        background-color: #f8f9fa;
        text-align: center;
        padding: 20px;
    }
    
    .content {
        margin: 20px;
    }
    
    .footer {
        background-color: #f8f9fa;
        text-align: center;
        padding: 20px;
    }
      </style>
    </head>
    <body>
        <div class="header">
            <h1>Congratulations, ${mailPayload.details.fullName}!</h1>
        </div>
        <div class="content">
            <p>We are thrilled to inform you that you have successfully been issued a certificate.</p>
            <p><strong>Issued by:</strong></p>
            <p><strong>Certificate Details:</strong></p>
            <ul>
              <li>Certificate ID: ${mailPayload.details.certificate_ID}</li>
              <li>Recipient Name: ${mailPayload.details.fullName} </li>
              <li>Recipient ID: ${mailPayload.details.recipient_ID} </li>
              <li>Recipient Email: ${mailPayload.details.recipient_email} </li>
              <li>Degree Name: ${mailPayload.details.degreeName} </li>
              <li>Degree Type: ${mailPayload.details.degreeType} </li>
              <li>Awarded Date: ${mailPayload.details.awarded_date} </li>
              <li>Issuance Date: ${mailPayload.details.issuance_date} </li>
              <li>Expiration Date: ${mailPayload.details.expiration_date} </li>
            </ul>
            <p>Your hard work and dedication have paid off and we are confident that you will achieve great things in your future endeavors.</p>
        </div>
        <div class="footer">
            <p>Best Regards,</p>
            <p>${mailPayload.issuer.institution_name}</p>
            <p>${mailPayload.issuer.handler}</p>
        </div>
    </body>
    </html>
    `;
  const msg = {
    to: mailPayload.to,
    from: 'madukaifeol@gmail.com', // Change to your verified sender
    subject: mailPayload.subject,
    html: textMail,
  };
  try {
    console.log("mailpayload: ", mailPayload);
    console.log("mail-msg: ", msg);

    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  } catch (error) {
    console.error(error);
  }
};

const SendEmail = async function (
  email: string,
  subject: string,
  message: string,
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,//"abdulrasaqolarewaju@gmail.com",
        pass: process.env.SMTP_PASS,//"falo lvcq kqhg zevn",
      },
    });
    const mailOption = {
      from: "abdulrasaqolarewaju88@gmail.com",
      to: email,
      subject, //"Verify your email",
      html: message, //`<p>Enter ${otpCode} in the app to verify your email address and complete the signUp process.</p>`
    };
    // sending the mail with error handling

    await transporter.sendMail(mailOption);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export { SendEmail, sendForgotPasswordMail, sendCredential };
