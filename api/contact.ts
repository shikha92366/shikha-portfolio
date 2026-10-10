import { ContactSchema } from '../src/lib/validations/contact';

// Sanitize string to prevent injection
function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: Request): Promise<Response> {
  // 1. Method check
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // 2. Parse & Validate input
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          fields: parsed.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { name, email, subject, message, website } = parsed.data;

    // 3. Honeypot check — silently succeed if bot filled the hidden website field
    if (website && website.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Message sent successfully.' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 4. Rate Limiting Check (Upstash Redis if configured)
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (upstashUrl && upstashToken) {
      try {
        const { Ratelimit } = await import('@upstash/ratelimit');
        const { Redis } = await import('@upstash/redis');
        
        const redis = new Redis({
          url: upstashUrl,
          token: upstashToken,
        });

        const ratelimit = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(5, '10 m'),
          analytics: true,
        });

        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        const { success: withinLimit } = await ratelimit.limit(ip);

        if (!withinLimit) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Too many requests. Please try again after 10 minutes.',
            }),
            {
              status: 429,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      } catch (rateLimitErr) {
        console.warn('[Upstash Rate Limit Warning]:', rateLimitErr);
        // Continue if rate limiter service has transient issue
      }
    }

    // 5. Sanitize text for email payload
    const safeName = sanitizeString(name);
    const safeEmail = sanitizeString(email);
    const safeSubject = sanitizeString(subject);
    const safeMessage = sanitizeString(message);

    // 6. Send email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || 'portfolio@onboarding.resend.dev';

    if (resendApiKey && receiverEmail) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: senderEmail,
          to: receiverEmail,
          replyTo: safeEmail,
          subject: `[Portfolio Inquiry] ${safeSubject} from ${safeName}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">New Contact Message</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              <p><strong>Subject:</strong> ${safeSubject}</p>
              <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px;">
                <p style="white-space: pre-wrap; margin: 0;">${safeMessage}</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('[Resend Error]:', emailErr);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to deliver message via email provider. Please email directly.',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      // In local development or demo mode without keys configured
      console.log('--- [Simulated Contact Form Submission] ---');
      console.log('From:', safeName, `<${safeEmail}>`);
      console.log('Subject:', safeSubject);
      console.log('Message:', safeMessage);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been dispatched successfully!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('[Contact Handler Error]:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Something went wrong on the server. Please try again or reach out via direct email.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
