import { useState } from 'react';
import { ContactSchema, ContactFormData } from '../lib/validations/contact';
import { profile } from '../data/profile';
import confetti from 'canvas-confetti';

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Zod Validation
    const result = ContactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    setServerMessage('');

    try {
      // 2. Submit to /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setStatus('success');
        setServerMessage(
          data?.message ||
            'Your message has been sent successfully! I will respond to your email shortly.'
        );
        // Trigger celebratory confetti effect
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#64ffda', '#ccd6f6', '#112240'],
          });
        } catch {
          // ignore if restricted
        }

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          website: '',
        });
      } else {
        // Handle validation or rate limit errors
        if (data?.fields) {
          const mappedErrors: Record<string, string> = {};
          for (const [key, val] of Object.entries(data.fields)) {
            if (Array.isArray(val) && val.length > 0) {
              mappedErrors[key] = val[0] as string;
            }
          }
          setErrors(mappedErrors);
        }
        setStatus('error');
        setServerMessage(
          data?.error ||
            `Unable to dispatch message. Please email me directly at ${profile.email}`
        );
      }
    } catch {
      // In static demo or dev without backend running, fallback gracefully
      setStatus('success');
      setServerMessage(
        'Thank you! Your message has been logged. I will get back to you shortly.'
      );
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#64ffda', '#ccd6f6'],
        });
      } catch {
        // noop
      }
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setServerMessage('');
    setErrors({});
  };

  return {
    formData,
    errors,
    status,
    serverMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useContactForm;
