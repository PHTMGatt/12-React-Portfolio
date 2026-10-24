import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, CheckCircle2, Copy, Loader2, Mail, Send, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import {
  GiHobbitDoor,
  GiBattleAxe,
  GiSwordsEmblem,
  GiElfHelmet,
  GiWizardStaff,
  GiDevilMask,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi';
import sendEmail from '../../utils/Email';
import { readPreference, writePreference } from '../../utils/storage';
import { validateEmail } from '../../utils/validation';
import contactThemes from './elvenScriptures';
import { profile } from '../../data/profile';
import usePageTitle from '../../hooks/usePageTitle';
import './Contact.css';

const scrollCategories = ['Default', 'Hobbit', 'Dwarf', 'Man', 'Elf', 'Wizard', 'Villain', 'Random'];

const iconMap = {
  Default: IoHome,
  Hobbit: GiHobbitDoor,
  Dwarf: GiBattleAxe,
  Man: GiSwordsEmblem,
  Elf: GiElfHelmet,
  Wizard: GiWizardStaff,
  Villain: GiDevilMask,
  Random: GiPerspectiveDiceSixFacesRandom,
};

const fields = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
  { id: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'A role, a project, or a quick question' },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me a little about what you have in mind…' },
];

const emptyForm = { name: '', email: '', subject: '', message: '', company: '' };

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!validateEmail(form.email)) errors.email = 'That email address doesn’t look quite right.';
  if (!form.subject.trim()) errors.subject = 'Please add a short subject.';
  if (form.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.';
  return errors;
};

const readStoredNumber = (key) => {
  const value = Number(readPreference(key, '0'));
  return Number.isInteger(value) && value >= 0 ? value : 0;
};

const Contact = () => {
  usePageTitle('Contact');
  const formRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [copied, setCopied] = useState(false);

  // Optional Middle-earth flavour for the form. Off by default so the
  // standard form stays clear; the visitor's choice is remembered.
  const [themed, setThemed] = useState(() => readPreference('contactThemed') === 'true');
  const [categoryIndex, setCategoryIndex] = useState(() => readStoredNumber('activeCategoryIndex') % scrollCategories.length);
  const [themeIndex, setThemeIndex] = useState(0);

  const category = scrollCategories[categoryIndex];
  const scrollsForCategory = useMemo(
    () =>
      category === 'Random'
        ? contactThemes.filter((t) => t.category !== 'Default')
        : contactThemes.filter((t) => t.category === category),
    [category]
  );
  const scroll = themed ? scrollsForCategory[themeIndex % scrollsForCategory.length] : null;
  const easterEgg = scroll?.category === 'Elf' && scroll?.title?.toLowerCase() === 'glimmer of galadriel';
  const CategoryIcon = iconMap[category];

  // Remembering the preference is optional; writePreference ignores blocked storage.
  useEffect(() => {
    writePreference('contactThemed', themed);
    writePreference('activeCategoryIndex', categoryIndex);
  }, [themed, categoryIndex]);

  const randomIndex = (list) => Math.floor(Math.random() * list.length);

  const nextCategory = () => {
    const nextIndex = (categoryIndex + 1) % scrollCategories.length;
    setCategoryIndex(nextIndex);
    setThemeIndex(scrollCategories[nextIndex] === 'Random' ? randomIndex(contactThemes) : 0);
  };

  const nextScroll = () => {
    setThemeIndex((prev) => (category === 'Random' ? randomIndex(scrollsForCategory) : prev + 1));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === 'failed') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validate(form);
    setErrors(found);
    const firstInvalid = fields.find((field) => found[field.id]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid.id}"]`)?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    if (form.company) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    const { name, email, subject, message } = form;
    const result = await sendEmail({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
    if (result.success) {
      setStatus('sent');
      setForm(emptyForm);
    } else {
      setStatus('failed');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const flavour = scroll
    ? {
        name: scroll.name,
        email: scroll.email,
        subject: scroll.subject,
        message: scroll.message,
      }
    : {};

  return (
    <div className={`contact page-enter${easterEgg ? ' contact--mellon' : ''}`}>
      <div className="container contact__layout">
        <aside className="contact__intro">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title">Let’s build something good</h1>
          <p className="section-lede">
            Hiring for a developer role, planning a project, or just want to talk shop? Send a message and I’ll get
            back to you.
          </p>
        </aside>

        <aside className="contact__alt" aria-label="Other ways to reach me">
          <div className="contact__direct surface-card">
            <p className="contact__direct-label">Prefer email?</p>
            <div className="contact__email-row">
              <a href={`mailto:${profile.email}`} className="contact__email">
                <Mail size={18} aria-hidden="true" />
                {profile.email}
              </a>
              <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied' : ''}
              </span>
            </div>
          </div>

          <ul className="contact__links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" />
                <span>
                  LinkedIn<small>Connect professionally</small>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" />
                <span>
                  GitHub<small>{profile.githubHandle}</small>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.discord} target="_blank" rel="noopener noreferrer">
                <FaDiscord aria-hidden="true" />
                <span>
                  Discord<small>{profile.discordHandle}</small>
                </span>
              </a>
            </li>
          </ul>
        </aside>

        <section className="contact__card surface-card" aria-labelledby="contact-form-title">
          {status === 'sent' ? (
            <div className="contact__success" role="status">
              <CheckCircle2 size={40} aria-hidden="true" />
              <h2 id="contact-form-title">Message sent. Thank you!</h2>
              <p>It’s on its way to my inbox. I’ll reply to the email address you provided.</p>
              <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="contact__card-header">
                <div>
                  <h2 id="contact-form-title">
                    {scroll ? (
                      <button type="button" className="contact__scroll-title" onClick={nextScroll} title={scroll.hover}>
                        {scroll.title}
                      </button>
                    ) : (
                      'Send a message'
                    )}
                  </h2>
                  <p className="contact__card-sub">
                    {scroll ? `${scroll.hover} Click the title for another scroll.` : 'All fields are required.'}
                  </p>
                </div>
                <div className="contact__flavour">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={themed}
                      onChange={(event) => setThemed(event.target.checked)}
                    />
                    <span className="switch__track" aria-hidden="true" />
                    <span className="switch__label">
                      <Sparkles size={14} aria-hidden="true" />
                      Middle-earth mode
                    </span>
                  </label>
                  {themed && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={nextCategory}
                      aria-label={`Scroll theme: ${category}. Switch theme`}
                    >
                      <CategoryIcon aria-hidden="true" />
                      {category}
                    </button>
                  )}
                </div>
              </div>

              {easterEgg && (
                <p className="contact__mellon" role="status">
                  You have unlocked the secret of friendship: <strong>Mellon!</strong>
                </p>
              )}

              <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
                {fields.map((field) => {
                  const error = errors[field.id];
                  const describedBy = [error && `${field.id}-error`, flavour[field.id] && `${field.id}-flavour`]
                    .filter(Boolean)
                    .join(' ');
                  const shared = {
                    id: field.id,
                    name: field.id,
                    value: form[field.id],
                    onChange: handleChange,
                    required: true,
                    placeholder: scroll?.[`${field.id}Placeholder`] || field.placeholder,
                    'aria-invalid': error ? true : undefined,
                    'aria-describedby': describedBy || undefined,
                  };

                  return (
                    <div key={field.id} className={`form-field${field.type === 'textarea' ? ' form-field--full' : ''}`}>
                      <label htmlFor={field.id}>
                        {field.label}
                        {flavour[field.id] && (
                          <span id={`${field.id}-flavour`} className="form-field__flavour">
                            {flavour[field.id]}
                          </span>
                        )}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea {...shared} rows={6} />
                      ) : (
                        <input {...shared} type={field.type} autoComplete={field.autoComplete} />
                      )}
                      {error && (
                        <p id={`${field.id}-error`} className="form-field__error">
                          {error}
                        </p>
                      )}
                    </div>
                  );
                })}

                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={handleChange} />
                </div>

                {status === 'failed' && (
                  <p className="form-alert" role="alert">
                    The message couldn’t be sent just now. Please try again, or email me directly at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={17} aria-hidden="true" />
                        {scroll?.button || 'Send message'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Contact;
