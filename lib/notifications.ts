/**
 * Email and SMS notification services
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SMSOptions {
  phone: string;
  template: string;
  params: Record<string, string>;
}

/**
 * Send email notification
 * In production, integrate with actual email service (Nodemailer, SendGrid, etc.)
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  // TODO: Implement actual email sending
  console.log('Sending email:', options);
  
  // Mock implementation for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`
      Email would be sent:
      To: ${options.to}
      Subject: ${options.subject}
      Body: ${options.text || options.html}
    `);
  }
}

/**
 * Send SMS notification
 * In production, integrate with Aliyun SMS or similar service
 */
export async function sendSMS(options: SMSOptions): Promise<void> {
  // TODO: Implement actual SMS sending
  console.log('Sending SMS:', options);
  
  // Mock implementation for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`
      SMS would be sent:
      To: ${options.phone}
      Template: ${options.template}
      Params: ${JSON.stringify(options.params)}
    `);
  }
}

/**
 * Send cooperation application notification
 */
export async function notifyCooperationApplication(
  email: string,
  phone: string,
  status: string
) {
  const statusText = {
    PENDING: '已收到',
    REVIEWING: '审核中',
    APPROVED: '已通过',
    REJECTED: '未通过',
    FOLLOW_UP: '需要跟进',
  }[status] || status;

  await sendEmail({
    to: email,
    subject: `合作申请${statusText} - 中国少年茶人`,
    html: `
      <h2>您的合作申请${statusText}</h2>
      <p>感谢您对中国少年茶人项目的关注。</p>
      <p>您的合作申请状态已更新为：${statusText}</p>
      <p>我们会尽快与您联系。</p>
    `,
    text: `您的合作申请${statusText}`,
  });

  if (phone) {
    await sendSMS({
      phone,
      template: 'cooperation_status',
      params: { status: statusText },
    });
  }
}

/**
 * Send teacher registration notification
 */
export async function notifyTeacherRegistration(
  email: string,
  name: string,
  tempPassword: string
) {
  await sendEmail({
    to: email,
    subject: '欢迎加入中国少年茶人 - 教师平台',
    html: `
      <h2>欢迎，${name}老师！</h2>
      <p>您的教师账号已创建成功。</p>
      <p>登录邮箱: ${email}</p>
      <p>临时密码: ${tempPassword}</p>
      <p>请尽快登录并修改密码。</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/teacher/login">立即登录</a></p>
    `,
    text: `欢迎加入中国少年茶人。登录邮箱: ${email}, 临时密码: ${tempPassword}`,
  });
}
