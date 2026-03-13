import nodemailer from 'nodemailer';

// Configure with your SMTP credentials in production
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_USER || 'test@example.com',
    pass: process.env.SMTP_PASS || 'testpass'
  }
});

export async function sendConfirmationEmail(to, applicantName, jobTitle, companyName) {
  const mailOptions = {
    from: '"Easily Job Portal" <noreply@easily.com>',
    to,
    subject: `Application Received - ${jobTitle} at ${companyName}`,
    html: `
      <h2>Hello ${applicantName},</h2>
      <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been received.</p>
      <p>We will review your profile and get back to you soon.</p>
      <br/>
      <p>Best regards,<br/>Easily Job Portal Team</p>
    `
  };
  return transporter.sendMail(mailOptions);
}
