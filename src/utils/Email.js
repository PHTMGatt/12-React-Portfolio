import emailjs from '@emailjs/browser';

// Your service ID, template ID, and public key from EmailJS
const SERVICE_ID = 'service_qp2wa0u';
const TEMPLATE_ID = 'template_kefqj3s';
const PUBLIC_KEY = 'QAFA81H1YJE06zj4p';

// Helper function for email validation.
const validateEmail = (email) =>
  /^(?!:\/\/)([A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+\.[A-Za-z]{2,})$/.test(email);

const sendEmail = async ({ name, email, subject, message }) => {
  if (!validateEmail(email)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }

  const formData = {
    name,
    email,
    subject,
    message,
  };

  try {
    // Sends the email using EmailJS.
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
    return { success: true, result };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: 'Something went wrong with the email service. Please try again.',
    };
  }
};

export default sendEmail;
