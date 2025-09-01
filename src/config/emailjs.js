// EmailJS Configuration
// Replace these placeholder values with your actual EmailJS credentials

export const emailjsConfig = {
  // Default service (CEO)
  serviceId: "service_edth0qz", // Your EmailJS service ID (you provided this)
  templateId: "template_zbzgmmw", // Your EmailJS template ID
  publicKey: "nQROpgsxnHxYeazYn" // Your EmailJS public key - Get this from https://dashboard.emailjs.com/admin/account
};

// Team members email configuration
export const teamMembers = {
  "ceo.eyercall@gmail.com": {
    name: "CEO",
    serviceId: "service_edth0qz", // Default service
    templateId: "template_zbzgmmw"
  },
  "developer.eyercall@gmail.com": {
    name: "Umer Mughal",
    serviceId: "service_yg1vq0p", // Umer's service
    templateId: "template_zbzgmmw"
  },
  "developer2.eyercall@gmail.com": {
    name: "Waleed Jafar",
    serviceId: "service_edth0qz", // Using default service for now
    templateId: "template_zbzgmmw"
  },
  "Hussnain@gmail.com": {
    name: "Muhammad Hussnain",
    serviceId: "service_edth0qz", // Using default service for now
    templateId: "template_zbzgmmw"
  }
};

// How to get these values:
// 1. Go to https://www.emailjs.com/ and create an account
// 2. Create a new Email Service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Copy the IDs from your dashboard
// 5. Get your Public Key from: https://dashboard.emailjs.com/admin/account
