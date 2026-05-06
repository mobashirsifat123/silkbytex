'use client';

import React, { useState } from 'react';
import Container from '@/components/common/Container';
import SectionHeader from '@/components/common/SectionHeader';
import Button from '@/components/ui/Button';
import { CheckCircle2, LoaderCircle, Send, ShieldCheck, Sparkles } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validateForm(values: FormState) {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Add a short subject.';
  }

  if (values.message.trim().length < 20) {
    errors.message = 'Tell us a little more about the project.';
  }

  return errors;
}

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const isSubmitting = status === 'submitting';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formState);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setFeedbackMessage('Please fix the highlighted fields before submitting.');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || 'We could not send your message.');
      }

      setStatus('success');
      setFeedbackMessage(payload.message || 'Message sent successfully.');
      setFormState(initialFormState);
      setErrors({});
    } catch (error) {
      setStatus('error');
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : 'We could not send your message. Please try again.',
      );
    }
  }

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });

    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  }

  return (
    <section id="contact" className="section-atmosphere py-[clamp(5rem,12vh,10rem)] relative bg-bg-secondary">
      <Container>
        <SectionHeader
          overline="GET IN TOUCH"
          title="Let's start a conversation"
          description="Send a real inquiry through the site and we will capture it immediately with clear success or error feedback."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div aria-live="polite" className="min-h-0">
              {feedbackMessage ? (
                <div
                  className={`rounded-[var(--radius-md)] border px-4 py-3 text-sm ${
                    status === 'success'
                      ? 'border-accent-400/40 bg-accent-400/10 text-accent-100'
                      : 'border-red-500/30 bg-red-500/10 text-red-200'
                  }`}
                >
                  {feedbackMessage}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-body-sm text-fg-secondary">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={120}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`w-full bg-bg-elevated border rounded-[var(--radius-md)] px-4 py-3 text-sm text-fg-primary placeholder:text-fg-faint focus:outline-none focus:ring-1 transition-all duration-200 ${
                    errors.name
                      ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-border focus:border-accent-400 focus:ring-accent-400/30'
                  }`}
                />
                {errors.name ? (
                  <p id="contact-name-error" className="text-sm text-red-300">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-body-sm text-fg-secondary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  placeholder="john@company.com"
                  autoComplete="email"
                  required
                  maxLength={160}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`w-full bg-bg-elevated border rounded-[var(--radius-md)] px-4 py-3 text-sm text-fg-primary placeholder:text-fg-faint focus:outline-none focus:ring-1 transition-all duration-200 ${
                    errors.email
                      ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-border focus:border-accent-400 focus:ring-accent-400/30'
                  }`}
                />
                {errors.email ? (
                  <p id="contact-email-error" className="text-sm text-red-300">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-body-sm text-fg-secondary">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formState.subject}
                placeholder="Project inquiry"
                autoComplete="off"
                required
                minLength={3}
                maxLength={160}
                disabled={isSubmitting}
                onChange={(event) => handleChange('subject', event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className={`w-full bg-bg-elevated border rounded-[var(--radius-md)] px-4 py-3 text-sm text-fg-primary placeholder:text-fg-faint focus:outline-none focus:ring-1 transition-all duration-200 ${
                  errors.subject
                    ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-border focus:border-accent-400 focus:ring-accent-400/30'
                }`}
              />
              {errors.subject ? (
                <p id="contact-subject-error" className="text-sm text-red-300">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-body-sm text-fg-secondary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formState.message}
                placeholder="Tell us about your project, goals, and timeline..."
                required
                minLength={20}
                maxLength={5000}
                disabled={isSubmitting}
                onChange={(event) => handleChange('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`w-full bg-bg-elevated border rounded-[var(--radius-md)] px-4 py-3 text-sm text-fg-primary placeholder:text-fg-faint focus:outline-none focus:ring-1 transition-all duration-200 resize-none ${
                  errors.message
                    ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-border focus:border-accent-400 focus:ring-accent-400/30'
                }`}
              />
              {errors.message ? (
                <p id="contact-message-error" className="text-sm text-red-300">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                icon={
                  isSubmitting ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )
                }
                className="min-w-[180px]"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>

          <div className="space-y-8 lg:pl-8">
            <p className="text-body-lg text-fg-secondary mb-8">
              This form is now the primary contact path on the site. Every valid
              submission is processed by the application and returns a visible
              result immediately, so visitors are not left guessing whether the
              message went anywhere.
            </p>

            <div className="glass rounded-[var(--radius-lg)] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-400/10 flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} className="text-accent-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-fg-primary mb-1">Clear delivery</h4>
                <p className="text-body-sm text-fg-secondary">
                  Successful submissions are accepted by the site backend and
                  recorded immediately.
                </p>
              </div>
            </div>

            <div className="glass rounded-[var(--radius-lg)] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-400/10 flex items-center justify-center shrink-0">
                <LoaderCircle size={18} className="text-accent-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-fg-primary mb-1">Visible progress</h4>
                <p className="text-body-sm text-fg-secondary">
                  The form disables inputs during submit and shows loading, success,
                  and error states inline.
                </p>
              </div>
            </div>

            <div className="glass rounded-[var(--radius-lg)] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-400/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-accent-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-fg-primary mb-1">No dead ends</h4>
                <p className="text-body-sm text-fg-secondary">
                  Placeholder contact routes and fake social paths have been removed
                  so the page only exposes working actions.
                </p>
              </div>
            </div>

            <div className="glass rounded-[var(--radius-lg)] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-400/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-accent-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-fg-primary mb-1">What to include</h4>
                <p className="text-body-sm text-fg-secondary">
                  Share the problem, timeline, scope, and constraints so the first
                  reply can be useful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
