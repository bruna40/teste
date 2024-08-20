import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const emailQueue = [
  {
    subject: '10 Motivos para Amar o Ceará - Razão 1',
    text: 'Eu, Marcos, amo o time Ceará, sendo o melhor time do mundo!',
    html: '<b>Eu, Marcos, amo o time Ceará, sendo o melhor time do mundo!</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 2',
    text: 'O Ceará tem uma torcida apaixonada que faz a diferença em cada jogo!',
    html: '<b>O Ceará tem uma torcida apaixonada que faz a diferença em cada jogo!</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 3',
    text: 'A história do Ceará é cheia de conquistas e momentos emocionantes.',
    html: '<b>A história do Ceará é cheia de conquistas e momentos emocionantes.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 4',
    text: 'O time sempre demonstra uma garra incrível em campo.',
    html: '<b>O time sempre demonstra uma garra incrível em campo.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 5',
    text: 'O Ceará tem uma tradição de revelar grandes talentos.',
    html: '<b>O Ceará tem uma tradição de revelar grandes talentos.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 6',
    text: 'Os jogos do Ceará são sempre emocionantes e cheios de energia.',
    html: '<b>Os jogos do Ceará são sempre emocionantes e cheios de energia.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 7',
    text: 'A rivalidade saudável com outros times torna cada partida ainda mais interessante.',
    html: '<b>A rivalidade saudável com outros times torna cada partida ainda mais interessante.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 8',
    text: 'O Ceará é conhecido pelo seu espírito esportivo e fair play.',
    html: '<b>O Ceará é conhecido pelo seu espírito esportivo e fair play.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 9',
    text: 'O time é um verdadeiro orgulho para seus torcedores e para a cidade.',
    html: '<b>O time é um verdadeiro orgulho para seus torcedores e para a cidade.</b>',

  },
  {
    subject: '10 Motivos para Amar o Ceará - Razão 10',
    text: 'A paixão pelo Ceará transcende fronteiras e une pessoas de diferentes lugares.',
    html: '<b>A paixão pelo Ceará transcende fronteiras e une pessoas de diferentes lugares.</b>',

  },
];

let currentIndex = 0;


const sendEmail = async (to) => {
  const email = emailQueue[currentIndex];

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }


  currentIndex = (currentIndex + 1) % emailQueue.length;
};


const startSendingEmails = (to) => {

  cron.schedule('*/20 8-17 * * *', () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if ((currentHour === 17 && currentMinute <= 30) || (currentHour < 17)) {
      sendEmail(to);
    }
  });
};


const recipient = process.env.EMAIL_RECIPIENT;
startSendingEmails(recipient);