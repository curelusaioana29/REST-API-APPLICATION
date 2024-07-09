import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/api/users/verify/${verificationToken}`,
    html: `<p>Please verify your email by clicking on the following link: <a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">${process.env.BASE_URL}/api/users/verify/${verificationToken}</a></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Verification email sent successfully');
  } catch (error) {
    throw new Error('Error sending verification email');
  }
};

export default sendVerificationEmail;
