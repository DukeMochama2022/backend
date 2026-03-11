// utils/emailTemplates.js

// Common styles for both emails
const baseStyles = `
  font-family: Arial, sans-serif; 
  background-color: #f5f5f5; 
  padding: 20px;
`;

const containerStyles = `
  max-width: 600px; 
  margin: auto; 
  background-color: #fff; 
  border-radius: 10px; 
  padding: 30px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const footerStyles = `
  font-size: 12px; 
  color: #777; 
  text-align: center;
`;

// Subscription Created Email
export const subscriptionCreated = ({ userName,name, price, renewalDate }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Subscription Activated</title>
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <h1 style="color: #4CAF50; text-align: center;">Subscription Activated!</h1>
    <p style="font-size: 16px;">Hello,${userName}</p>
    <p style="font-size: 16px;">Thank you for subscribing to <strong>${name}</strong>.</p>
    <ul style="font-size: 16px; line-height: 1.6;">
      <li><strong>Price:</strong> $${price}</li>
      <li><strong>Next Renewal Date:</strong> ${new Date(renewalDate).toDateString()}</li>
    </ul>
    <p style="font-size: 16px;">We are excited to have you on board!</p>
    <p style="text-align: center; margin-top: 30px;">
      <a href="http://localhost:5000" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none;">Go to Dashboard</a>
    </p>
    <hr style="margin-top: 30px;">
    <p style="${footerStyles}">&copy; 2026 Subscription Tracker. All rights reserved.</p>
  </div>
</body>
</html>
`;

// Subscription Reminder Email
export const subscriptionReminder = ({ name, renewalDate, daysBefore }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Subscription Reminder</title>
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <h1 style="color: #FF9800; text-align: center;">Subscription Renewal Reminder</h1>
    <p style="font-size: 16px;">Hello,</p>
    <p style="font-size: 16px;">
      Your subscription <strong>${name}</strong> will renew on 
      <strong>${new Date(renewalDate).toDateString()}</strong>.
    </p>
    <p style="font-size: 16px;">
      This is a friendly reminder <strong>${daysBefore} day(s) before renewal</strong>. 
      Please ensure your payment method is ready to avoid any interruptions.
    </p>
    <p style="text-align: center; margin-top: 30px;">
      <a href="http://localhost:5000" style="display: inline-block; background-color: #FF9800; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none;">Manage Subscription</a>
    </p>
    <hr style="margin-top: 30px;">
    <p style="${footerStyles}">&copy; 2026 Subscription Tracker. All rights reserved.</p>
  </div>
</body>
</html>
`;