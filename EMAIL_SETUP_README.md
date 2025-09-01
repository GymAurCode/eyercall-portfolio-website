# Email Setup Instructions for Contact Form

## Overview
The contact form has been updated to send emails to `ceo.eyercall@gmail.com` when users submit the form. This is implemented using EmailJS, a service that allows sending emails directly from the frontend.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down the **Service ID** (you'll need this later)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Email Body:**
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

This message was sent from your website contact form.
```

4. Save the template and note down the **Template ID**

### 4. Get Your Public Key
1. Go to "Account" → "API Keys" in your dashboard
2. Copy your **Public Key**

### 5. Update Configuration
1. Open `src/config/emailjs.js`
2. Replace the placeholder values with your actual credentials:

```javascript
export const emailjsConfig = {
  serviceId: "your_actual_service_id_here",
  templateId: "your_actual_template_id_here", 
  publicKey: "your_actual_public_key_here"
};
```

### 6. Test the Form
1. Start your development server: `npm run dev`
2. Go to the contact page
3. Fill out the form and submit
4. Check if you receive the email at `ceo.eyercall@gmail.com`

## How It Works

1. **Form Validation**: The form checks if all three fields (name, email, message) are filled
2. **Email Sending**: Uses EmailJS to send the form data to the specified email address
3. **User Feedback**: Shows success/error messages and loading states
4. **Form Reset**: Clears the form after successful submission

## Troubleshooting

### Common Issues:

1. **"Failed to send message" error**
   - Check if your EmailJS credentials are correct
   - Verify your email service is properly configured
   - Check browser console for detailed error messages

2. **Emails not received**
   - Check spam/junk folder
   - Verify the recipient email address in the template
   - Check EmailJS dashboard for delivery status

3. **Form not submitting**
   - Ensure all required fields are filled
   - Check browser console for JavaScript errors
   - Verify EmailJS package is properly installed

### Support:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)

## Security Notes

- The public key is safe to expose in frontend code
- EmailJS handles the actual email sending securely
- No sensitive data is stored locally
- Form validation prevents empty submissions

## Cost Information

- EmailJS offers 200 free emails per month
- Additional emails cost $0.20 per 100 emails
- No setup fees or monthly charges for basic usage
