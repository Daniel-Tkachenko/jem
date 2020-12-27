'use strict';

const nodemailer = require('nodemailer');
const config = require('../../config/mailConfig');

// Utils
// const newsletterLogger = require('../newsletter-logger/logger');

// Letters' templates
const templates = require('./templates');

// Mail configuration constants
const smtp = config.SMTPSERVER; // smtp-server name
const emailUser = config.EMAIL; // email-address used to send mail
const emailPass = config.EMAIL_PASS; // password

// Returns options for site's mail form
const createFormOptions = (senderName, senderMail, mailData, attachment) => {
  return {
    from: `${senderName} <${senderMail}>`,
    to: senderMail,
    subject: 'Форма зворотнього зв\'язку | Jem productions',
    attachments : [
      {
        filename: attachment,
        path: attachment
      }
    ],
    html: templates.formTemplate(mailData)
  };
};

// Needed fields for article project:
// 1. title - title of the news article;
// 2. description - description, preview of the content;
// 3. imageUrl - URL of the main image of the article;
// 4. url - URL of the article itself.
// const createNewsletterOptions = (subMail, article) => {
//   return {
//     from: `"Suntown-Ukraine Newsletter" <sales@suntown-ukraine.com>`,
//     to: subMail,
//     subject: `${article.title} | Suntown-Ukraine`,
//     html: templates.newsletterTemplate(article),
//     attachments: [
//       {
//         filename: 'logo.png',
//         path: 'utils/mailUtils/templateImages/Logo.png',
//         cid: 'logo@news.suntown'
//       },
//       {
//         filename: 'mainImage.png',
//         path: `https://suntown-ukraine.com/${article.imageUrl}`,
//         cid: 'mainImage@news.suntown'
//       }
//     ]
//   };
// };

// const createVerifyMailOptions = (email, token, unsubKey) => {
//   return {
//     from: `"Suntown-Ukraine Newsletter" <sales@suntown-ukraine.com>`,
//     to: email,
//     subject: 'Подтверждение e-mail | Suntown-Ukraine',
//     html: templates.verifyMailTemplate(token, unsubKey)
//   };
// };

// DEVELOPMENT ONLY, will be removed in production
// const createVerifyDevOptions = (token, unsubscribeKey) => {
//   return {
//     from: `"Verify your e-mail" <alexequinoxtest@gmail.com>`,
//     to: 'alexequinoxtest@gmail.com',
//     subject: 'Mail verification test',
//     html: templates.verifyMailTemplate(token, unsubscribeKey)
//   };
// };

const getTransporter = transporterOptions => {
  const {
    smtp,
    emailUser,
    emailPass
  } = transporterOptions;

  return nodemailer.createTransport({
    host: smtp,
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

// Returns a transporter which uses production mail options
const getDefaultTransporter = () => {
  const transporterOptions = { 
    smtp, 
    emailUser,
    emailPass
  };
  return getTransporter(transporterOptions);
};

// DEVELOPMENT ONLY
const getTestTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alexequinoxtest@gmail.com',
      pass: '777vns777'
    }
  });
};

// Method to send any mail
const sendMail = (transporter, mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve({
        message: 'Письмо было успешно отправлено.',
        to: mailOptions.to
      });
    });
  });
};

// Sends new article to every provided subscriber
// const sendNewsletter = (transporter, subscribers, article) => {
//   for (let subscriber of subscribers) {
//     sendMail(
//       transporter,
//       createNewsletterOptions(subscriber.email, article)
//     )
//     .catch(err => {
//       console.log(err);
//       newsletterLogger.logFailure(
//         subscriber.email,
//         article.title,
//         err.message
//       );
//     });
//   }
// };

const mailSender = {
  createFormOptions,
  // createVerifyMailOptions,
  // createVerifyDevOptions, // DEV
  getTransporter,
  getDefaultTransporter,
  getTestTransporter, // DEV
  sendMail,
  // sendNewsletter
};

module.exports = mailSender;


