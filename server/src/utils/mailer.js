const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru', //тут у тебя будет smtp.mail.ru
  port: 465, // тут порт для mail ru надо посмотреть
  secure: true, // Use true for port 465, false for all other ports
  auth: {
    user: 'barbershopsever@mail.ru', // тут имя твоего ящика
    pass: 'bBCDDsyy4zXqaQid7xMw', // тут пароль не тот который ты создал , а пароль для стороннего приложения
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"barbershopsever@mail.ru 👻" <barbershopsever@mail.ru>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔️', // Subject line
    text: 'Вы успешно зарегестрировались', // plain text body
    html: '<b>Вы успешно зарегестрировались</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

module.exports = main;