import { ContactForm } from '../components/contact/ContactForm';

export function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <ContactForm standalone />
    </div>
  );
}

export default Contact;
