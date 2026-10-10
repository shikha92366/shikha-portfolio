import { useContactForm } from '../../hooks/useContactForm';
import { SectionHeading } from '../layout/SectionHeading';
import { profile } from '../../data/profile';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Shield } from 'lucide-react';

interface ContactFormProps {
  standalone?: boolean;
}

export function ContactForm({ standalone = false }: ContactFormProps) {
  const {
    formData,
    errors,
    status,
    serverMessage,
    handleChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  return (
    <section id="contact" className={standalone ? 'py-4' : 'py-16 sm:py-24'}>
      <SectionHeading title={standalone ? "send a message" : "contact"} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-xl bg-[#112240] border border-[#233554] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#ccd6f6]">
                Get in Touch
              </h3>
              <p className="text-sm text-[#8892b0] mt-2 leading-relaxed">
                Whether you have a question about embedded firmware, avionics telemetry, PCB design, or just want to say hi, my inbox is always open.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#0a192f] border border-[#233554]">
                <div className="p-2 rounded bg-[#112240] text-[#64ffda] border border-[#233554]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#8892b0] font-mono text-[11px] block uppercase">
                    Email
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#ccd6f6] font-semibold hover:text-[#64ffda] transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#0a192f] border border-[#233554]">
                <div className="p-2 rounded bg-[#112240] text-[#64ffda] border border-[#233554]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#8892b0] font-mono text-[11px] block uppercase">
                    Location
                  </span>
                  <span className="text-[#ccd6f6] font-semibold">{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3 text-[#ccd6f6]">
              <a
                href={profile.socials.find((s) => s.label === 'GitHub')?.url || 'https://github.com/shikha92366'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-[#233554] hover:border-[#64ffda] hover:text-[#64ffda] bg-[#0a192f] transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com/in/shikha-shikha-30b9aa325'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-[#233554] hover:border-[#64ffda] hover:text-[#64ffda] bg-[#0a192f] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0a192f] border border-[#233554] text-[11px] font-mono text-[#8892b0] space-y-1">
              <div className="text-[#64ffda] font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>SPAM PROTECTION ACTIVE</span>
              </div>
              <p>
                Protected by client &amp; server Zod validation, honeypot filters, and rate limiting.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl bg-[#112240] border border-[#233554]">
            {status === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#ccd6f6]">Message Sent!</h3>
                <p className="text-sm text-[#8892b0] max-w-md mx-auto leading-relaxed">
                  {serverMessage}
                </p>
                <div className="pt-3">
                  <button
                    onClick={resetForm}
                    className="btn-mint-outline px-5 py-2 rounded text-xs font-mono"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {status === 'error' && (
                  <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{serverMessage}</span>
                  </div>
                )}

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website (leave empty)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-[#ccd6f6] mb-1.5">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className={`w-full px-3.5 py-2.5 rounded bg-[#0a192f] border text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#64ffda] transition-colors ${
                        errors.name ? 'border-rose-500' : 'border-[#233554]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-[#ccd6f6] mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className={`w-full px-3.5 py-2.5 rounded bg-[#0a192f] border text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#64ffda] transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-[#233554]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-[#ccd6f6] mb-1.5">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className={`w-full px-3.5 py-2.5 rounded bg-[#0a192f] border text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#64ffda] transition-colors ${
                      errors.subject ? 'border-rose-500' : 'border-[#233554]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-[#ccd6f6] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Hi Shikha, I'd like to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className={`w-full px-3.5 py-2.5 rounded bg-[#0a192f] border text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#64ffda] transition-colors resize-none ${
                      errors.message ? 'border-rose-500' : 'border-[#233554]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#8892b0]/70">
                    * Required fields
                  </span>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-mint-outline px-6 py-2.5 rounded text-xs font-mono inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
