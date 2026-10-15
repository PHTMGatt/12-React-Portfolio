import React, { useEffect, useState } from 'react';
import './Contact.css';
import sendEmail from '../../utils/Email';
import contactThemes from './elvenScriptures';
import { IoHome, IoLogoGithub, IoMailOutline, IoSparklesOutline } from 'react-icons/io5';
import {
  GiHobbitDoor,
  GiBattleAxe,
  GiSwordsEmblem,
  GiElfHelmet,
  GiWizardStaff,
  GiDevilMask,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi';

const scrollCategories = [
  'Default',
  'Hobbit',
  'Dwarf',
  'Man',
  'Elf',
  'Wizard',
  'Villain',
  'Random',
];

const iconMap = {
  Default: <IoHome size={22} />,
  Hobbit: <GiHobbitDoor size={22} />,
  Dwarf: <GiBattleAxe size={22} />,
  Man: <GiSwordsEmblem size={22} />,
  Elf: <GiElfHelmet size={22} />,
  Wizard: <GiWizardStaff size={22} />,
  Villain: <GiDevilMask size={22} />,
  Random: <GiPerspectiveDiceSixFacesRandom size={22} />,
};

const emptyForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(() => {
    const stored = localStorage.getItem('activeCategoryIndex');
    const parsed = stored ? Number(stored) : 0;
    return Number.isInteger(parsed) && parsed >= 0 && parsed < scrollCategories.length ? parsed : 0;
  });
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  const category = scrollCategories[activeCategoryIndex];
  const itemsForDisplay =
    category === 'Random'
      ? contactThemes.filter(theme => theme.category !== 'Default')
      : contactThemes.filter(theme => theme.category === category);

  const activeTheme =
    itemsForDisplay.length > 0
      ? itemsForDisplay[activeThemeIndex % itemsForDisplay.length]
      : contactThemes[0];

  useEffect(() => {
    localStorage.setItem('activeCategoryIndex', activeCategoryIndex);

    if (category === 'Random' && itemsForDisplay.length) {
      setActiveThemeIndex(Math.floor(Math.random() * itemsForDisplay.length));
    } else {
      setActiveThemeIndex(0);
    }

    setForm(emptyForm);
    setError('');
    setSuccess('');
  }, [activeCategoryIndex]);

  useEffect(() => {
    setEasterEggActive(
      activeTheme?.category === 'Elf' &&
      activeTheme?.title?.toLowerCase() === 'glimmer of galadriel'
    );
  }, [activeTheme]);

  const cycleTheme = () => {
    if (!itemsForDisplay.length) return;

    if (category === 'Random') {
      setActiveThemeIndex(Math.floor(Math.random() * itemsForDisplay.length));
    } else {
      setActiveThemeIndex(prev => (prev + 1) % itemsForDisplay.length);
    }

    setForm(emptyForm);
    setError('');
    setSuccess('');
  };

  const handleScrollClick = () => {
    setActiveCategoryIndex(prev => (prev + 1) % scrollCategories.length);
  };

  const handleChange = event => {
    const { id, value } = event.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please complete every field before sending your message.');
      return;
    }

    const strongEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!strongEmailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmail({ name, email, subject, message });
      if (result.success) {
        setSuccess('Message sent successfully. I’ll be in touch soon.');
        setForm(emptyForm);
      } else {
        setError('The message could not be sent. Please try again in a moment.');
      }
    } catch {
      setError('The email service is temporarily unavailable. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`contact-section fade-in ${easterEggActive ? 'easter-egg' : ''}`}>
      {easterEggActive && (
        <div className="easter-egg-banner">
          You have unlocked the secret of friendship: <strong>Mellon!</strong>
        </div>
      )}

      <div className="contact-layout">
        <div className="contact-intro">
          <span className="contact-kicker">Contact</span>
          <h1>Let’s build something useful.</h1>
          <p>
            Have a project, role, collaboration, or technical problem worth solving?
            Send me a message and I’ll get back to you as soon as I can.
          </p>

          <div className="contact-direct-links">
            <a href="mailto:PHTMGatt@gmail.com">
              <IoMailOutline aria-hidden="true" />
              PHTMGatt@gmail.com
            </a>
            <a href="https://github.com/PHTMGatt" target="_blank" rel="noreferrer">
              <IoLogoGithub aria-hidden="true" />
              GitHub
            </a>
          </div>

          <div className="contact-easter-note">
            <IoSparklesOutline aria-hidden="true" />
            <span>The form still has some personality. Cycle the scroll themes if you want to find the hidden extras.</span>
          </div>
        </div>

        <div className="contact-form-shell">
          <button
            type="button"
            className="contact-title"
            data-tooltip={activeTheme?.hover || 'Scroll'}
            onClick={cycleTheme}
            aria-label="Cycle the current contact form scroll theme"
          >
            {activeTheme?.icon} {activeTheme?.title || 'Contact Me'}
          </button>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">{activeTheme?.name || 'Your name'}</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder={activeTheme?.namePlaceholder || 'Enter your name'}
              value={form.name}
              onChange={handleChange}
            />

            <label htmlFor="email">{activeTheme?.email || 'Your email'}</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={activeTheme?.emailPlaceholder || 'Enter your email'}
              value={form.email}
              onChange={handleChange}
            />

            <label htmlFor="subject">{activeTheme?.subject || 'Subject'}</label>
            <input
              id="subject"
              type="text"
              placeholder={activeTheme?.subjectPlaceholder || 'What would you like to discuss?'}
              value={form.subject}
              onChange={handleChange}
            />

            <label htmlFor="message">{activeTheme?.message || 'Message'}</label>
            <textarea
              id="message"
              rows="6"
              placeholder={activeTheme?.messagePlaceholder || 'Enter your message'}
              value={form.message}
              onChange={handleChange}
            />

            <div className="button-row">
              <button
                type="submit"
                className="magic-btn magic-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : activeTheme?.button || 'Send Message'}
              </button>

              <button
                type="button"
                onClick={handleScrollClick}
                className="magic-btn"
                data-tooltip="Cycle scroll theme categories"
              >
                {iconMap[category]}
                <span className="scroll-text">{category === 'Default' ? 'Scrolls' : category}</span>
              </button>
            </div>

            <div className="form-status" aria-live="polite">
              {error && <p className="form-error">{error}</p>}
              {success && <p className="form-success">{success}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
