const nodemailer = require('nodemailer');

// إعداد البريد الإلكتروني
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'doaazaqout99@gmail.com',
    pass: 'jhujieysqbfbhvog'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// دالة إرسال رسالة التحقق
const sendVerificationEmail = async (email, verificationCode, userName) => {
  try {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?code=${verificationCode}&email=${encodeURIComponent(email)}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
          .header { background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; }
          .button { display: inline-block; background: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .code { background: #f5f5f5; padding: 10px; border-radius: 5px; text-align: center; font-family: monospace; font-size: 18px; letter-spacing: 2px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ELIVIUM</h1>
          </div>
          <div class="content">
            <h2>مرحباً ${userName}!</h2>
            <p>شكراً لتسجيلك في متجر Elivium. يرجى التحقق من بريدك الإلكتروني لتنشيط حسابك.</p>
            <p>رمز التحقق الخاص بك:</p>
            <div class="code">${verificationCode}</div>
            <p>أو اضغط على الزر أدناه:</p>
            <a href="${verificationLink}" class="button">تحقق من بريدك الإلكتروني</a>
            <p style="color: #999; font-size: 12px;">
              إذا لم تكن قد قمت بإنشاء حساب، يرجى تجاهل هذا البريد.
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Elivium Store. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: '✅ تحقق من بريدك الإلكتروني - Elivium',
      html: htmlContent
    });

    console.log(`✅ Email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// دالة إرسال رسالة استرجاع كلمة المرور
const sendPasswordResetEmail = async (email, resetToken, userName) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
          .header { background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; }
          .button { display: inline-block; background: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ELIVIUM</h1>
          </div>
          <div class="content">
            <h2>إعادة تعيين كلمة المرور</h2>
            <p>مرحباً ${userName}!</p>
            <p>تلقينا طلب لإعادة تعيين كلمة المرور الخاصة بك. اضغط على الزر أدناه لإعادة تعيينها.</p>
            <a href="${resetLink}" class="button">إعادة تعيين كلمة المرور</a>
            <p style="color: #999; font-size: 12px;">هذا الرابط صالح لمدة 24 ساعة فقط.</p>
            <p style="color: #999; font-size: 12px;">إذا لم تطلب هذا، يرجى تجاهل هذا البريد.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Elivium Store. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: '🔑 إعادة تعيين كلمة المرور - Elivium',
      html: htmlContent
    });

    console.log(`✅ Reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};