'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData) {
  try {
    const name = formData.get('name');
    const contact = formData.get('contact');
    const scope = formData.get('scope');
    const budget = formData.get('budget');
    const currency = formData.get('currency');

    // Email to Arzuno Team (You)
    await resend.emails.send({
      from: 'Arzuno Team <onboarding@resend.dev>', // Resend free tier requires sending from resend.dev, but we can reply-to the client
      to: 'arzunoteam@gmail.com',
      reply_to: contact.includes('@') ? contact : undefined, // If it's an email, set reply-to
      subject: `New Lead from ${name} - Arzuno`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name/Company:</strong> ${name}</p>
        <p><strong>Contact Info:</strong> ${contact}</p>
        <p><strong>Budget:</strong> ${budget} ${currency}</p>
        <p><strong>Project Scope:</strong><br/>${scope.replace(/\n/g, '<br/>')}</p>
      `
    });

    // Auto-reply to Client (Only if they provided a valid email address)
    if (contact && contact.includes('@')) {
      await resend.emails.send({
        from: 'Arzuno Team <onboarding@resend.dev>',
        to: contact,
        subject: 'We received your inquiry - Arzuno',
        html: `
          <h2>Hi ${name},</h2>
          <p>Thank you for reaching out to Arzuno!</p>
          <p>We've received your project details and budget estimation of ${budget} ${currency}. Our team is reviewing your scope and will get back to you shortly to discuss the next steps.</p>
          <p><strong>For instant responses, you can also contact us directly on WhatsApp at +92 333 3479586.</strong></p>
          <br/>
          <p>Best regards,<br/>The Arzuno Team</p>
        `
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}
