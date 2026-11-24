import nodemailer from 'nodemailer';

const REQUIRED_FIELDS = ['fullName', 'workEmail', 'contactName', 'businessEmail', 'referralCompanyName'];

// Prevent submitted values from injecting HTML into the email body
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const {
      fullName = '',
      workEmail = '',
      companyName = '',
      contactName = '',
      businessEmail = '',
      referralCompanyName = '',
      solution = '',
      additionalInfo = '',
    } = await request.json();

    const data = { fullName, workEmail, companyName, contactName, businessEmail, referralCompanyName, solution, additionalInfo };

    const missing = REQUIRED_FIELDS.filter((field) => !String(data[field]).trim());
    if (missing.length > 0) {
      return Response.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const { EMAIL_USER, EMAIL_PASSWORD, RECEIVE_EMAIL } = process.env;
    if (!EMAIL_USER || !EMAIL_PASSWORD || !RECEIVE_EMAIL) {
      return Response.json(
        { success: false, message: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // Google shows App Passwords as "abcd efgh ijkl mnop"; accept them pasted as-is
      auth: { user: EMAIL_USER.trim(), pass: EMAIL_PASSWORD.replace(/\s/g, '') },
    });

    const rows = [
      ['Your Information', null],
      ['Full Name', fullName],
      ['Work Email', workEmail],
      ['Company Name', companyName],
      ['Referral', null],
      ['Contact Name', contactName],
      ['Business Email', businessEmail],
      ['Company Name', referralCompanyName],
      ['Solution', solution],
      ['Anything Else?', additionalInfo],
    ];

    const text = rows
      .map(([label, value]) => (value === null ? `\n${label.toUpperCase()}` : `${label}: ${value || '-'}`))
      .join('\n');

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #212529;">
        <h2 style="color: #0052CC;">New Business Referral</h2>
        <table cellpadding="6" style="border-collapse: collapse;">
          ${rows
            .map(([label, value]) =>
              value === null
                ? `<tr><td colspan="2" style="padding-top: 16px; font-weight: 700; color: #003DA5;">${label}</td></tr>`
                : `<tr><td style="color: #6c757d; vertical-align: top;">${label}</td><td>${escapeHtml(value) || '-'}</td></tr>`
            )
            .join('')}
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"vMeasure Referrals" <${EMAIL_USER}>`,
      to: RECEIVE_EMAIL,
      replyTo: workEmail,
      subject: `New Referral: ${referralCompanyName} (from ${fullName})`,
      text,
      html,
    });

    return Response.json({ success: true, message: 'Referral sent successfully.' });
  } catch (error) {
    console.error('Error sending referral email:', error);
    return Response.json(
      { success: false, message: 'Failed to send referral. Please try again later.' },
      { status: 500 }
    );
  }
}
