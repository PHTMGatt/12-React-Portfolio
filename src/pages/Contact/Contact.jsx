// Contact.jsx
import React, { useState, useEffect } from 'react';
import './Contact.css';
import sendEmail from '../../utils/Email';
import contactThemes from './elvenScriptures';
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
  Default: <IoHome size={24} />,
  Hobbit: <GiHobbitDoor size={24} />,
  Dwarf: <GiBattleAxe size={24} />,
  Man: <GiSwordsEmblem size={24} />,
  Elf: <GiElfHelmet size={24} />,
  Wizard: <GiWizardStaff size={24} />,
  Villain: <GiDevilMask size={24} />,
  Random: <GiPerspectiveDiceSixFacesRandom size={24} />,
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Active category index from localStorage or default.
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(() => {
    const stored = localStorage.getItem('activeCategoryIndex');
    return stored ? Number(stored) : 0;
  });
  // Which item within that category
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  const category = scrollCategories[activeCategoryIndex];
  const itemsForDisplay =
    category === 'Random'
      ? contactThemes.filter((t) => t.category !== 'Default')
      : contactThemes.filter((t) => t.category === category);

  const activeTheme =
    itemsForDisplay.length > 0
      ? itemsForDisplay[activeThemeIndex % itemsForDisplay.length]
      : contactThemes[0];

  // On category change
  useEffect(() => {
    localStorage.setItem('activeCategoryIndex', activeCategoryIndex);

    if (category === 'Random' && itemsForDisplay.length) {
      setActiveThemeIndex(Math.floor(Math.random() * itemsForDisplay.length));
    } else {
      setActiveThemeIndex(0);
    }
    setForm({ name: '', email: '', subject: '', message: '' });
  }, [activeCategoryIndex]);

  useEffect(() => {
    // Only activate Easter Egg when the active theme is exactly 'Galadriel’s' scroll.
    if (
      activeTheme?.category === 'Elf' && 
      activeTheme?.title?.toLowerCase() === 'glimmer of galadriel'
    ) {
      setEasterEggActive(true);
    } else {
      setEasterEggActive(false);
    }
  }, [activeTheme]);
  

  const cycleTheme = () => {
    if (category === 'Random' && itemsForDisplay.length) {
      setActiveThemeIndex(Math.floor(Math.random() * itemsForDisplay.length));
    } else {
      setActiveThemeIndex((prev) => (prev + 1) % itemsForDisplay.length);
    }
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleScrollClick = () => {
    const nextIndex = (activeCategoryIndex + 1) % scrollCategories.length;
    setActiveCategoryIndex(nextIndex);
  };

  // Manual Easter Egg toggle
  const toggleEasterEgg = () => {
    setEasterEggActive((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      return setError('Don’t leave me in the dark, all fields must be filled!');
    }

    const strongEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!strongEmailRegex.test(email)) {
      return setError('A wizard’s magic is strong, but your email isn’t valid. Try again!');
    }

    try {
      const result = await sendEmail({ name, email, subject, message });
      if (result.success) {
        setSuccess("Message sent successfully! I’ll be in touch soon.");
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Something went wrong. The road isn’t always clear, try once more!');
      }
    } catch {
      setError('Something went wrong with the email service. Try again, brave soul.');
    }
  };

  return (
    <section className={`contact-section fade-in ${easterEggActive ? 'easter-egg' : ''}`}>
      {easterEggActive && (
        <div className="easter-egg-banner">
          You have unlocked the secret of friendship: <strong>Mellon!</strong>
        </div>
      )}

      <h1
        className="contact-title"
        data-tooltip={activeTheme?.hover || 'Scroll'}
        onClick={cycleTheme}
      >
        {activeTheme?.icon} {activeTheme?.title || 'No title'}
      </h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">{activeTheme?.name || 'Your name'}</label>
        <input
          id="name"
          type="text"
          placeholder={activeTheme?.namePlaceholder || 'Enter your name'}
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">{activeTheme?.email || 'Your email'}</label>
        <input
          id="email"
          type="email"
          placeholder={activeTheme?.emailPlaceholder || 'Enter your email'}
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="subject">{activeTheme?.subject || 'Your subject'}</label>
        <input
          id="subject"
          type="text"
          placeholder={activeTheme?.subjectPlaceholder || 'Enter your subject'}
          value={form.subject}
          onChange={handleChange}
        />

        <label htmlFor="message">{activeTheme?.message || 'Your message'}</label>
        <textarea
          id="message"
          placeholder={activeTheme?.messagePlaceholder || 'Enter your message'}
          value={form.message}
          onChange={handleChange}
        />

        <div className="button-row">
          <button
            type="submit"
            className="magic-btn"
            data-tooltip="Send your message into the ether..."
          >
            {activeTheme?.button || 'Send Message'}
          </button>

          <button
            type="button"
            onClick={handleScrollClick}
            className="magic-btn"
            data-tooltip="Toggle Scroll Themes"
          >
            {iconMap[category]}
            <span className="scroll-text">Scrolls</span>
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
      </form>
    </section>
  );
};

export default Contact;
