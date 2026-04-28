const { Resend } = require('resend');

const resend = new Resend('re_EyGv3mW4_P1WojueqkzrQCmEirzsdBnss'); // ← حطي الـ API Key هون

const sendVerificationEmail = async (email, verificationCode, userName) => {
  try {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?code=${verificationCode}&email=${encodeURIComponent(email)}`;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '✅ تحقق من بريدك الإلكتروني - Elivium',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center;">
            <h1>ELIVIUM</h1>
          </div>
          <div style="padding: 20px;">
            <h2>مرحباً ${userName}!</h2>
            <p>رمز التحقق الخاص بك:</p>
            <div style="background: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold;">
              ${verificationCode}
            </div>
            <p>أو اضغط على الرابط:</p>
            <a href="${verificationLink}" style="background: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              تحقق من بريدك
            </a>
          </div>
        </div>
      `
    });

    console.log(`✅ Email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

const sendPasswordResetEmail = async (email, resetToken, userName) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🔑 إعادة تعيين كلمة المرور - Elivium',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center;">
            <h1>ELIVIUM</h1>
          </div>
          <div style="padding: 20px;">
            <h2>إعادة تعيين كلمة المرور</h2>
            <p>مرحباً ${userName}!</p>
            <a href="${resetLink}" style="background: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              إعادة تعيين كلمة المرور
            </a>
          </div>
        </div>
      `
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