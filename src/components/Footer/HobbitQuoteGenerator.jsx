import { useEffect, useRef, useState } from 'react';
import { Dices } from '../Icon/icons';
import { fetchOneApiQuote } from '../../utils/oneApiQuote';
import './QuoteAnimations.css';

// A small Middle-earth easter egg. "Another quote" asks The One API for a random
// quote when a build-time key is set (VITE_ONE_API_KEY). The built-in list below
// is what shows first and what the footer falls back to on any failure or when
// there is no key, so it never breaks and never needs the network to render.
const quotes = [
  'Not all those who wander are lost.',
  'Even the smallest person can change the course of the future.',
  'All we have to decide is what to do with the time that is given us.',
  'There is some good in this world, and it’s worth fighting for.',
  'The road goes ever on and on.',
];

const apiKey = import.meta.env.VITE_ONE_API_KEY;

// A bounded pick that always moves to a different quote and cannot loop forever.
const nextIndex = (current) => (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length;

const HobbitQuoteGenerator = () => {
  const [text, setText] = useState(quotes[0]);
  const [visible, setVisible] = useState(true);
  const index = useRef(0);
  const busy = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const nextQuote = async () => {
    if (busy.current) return;
    busy.current = true;
    setVisible(false);
    const [fetched] = await Promise.all([
      fetchOneApiQuote({ key: apiKey }),
      new Promise((resolve) => setTimeout(resolve, 200)),
    ]);
    busy.current = false;
    if (!mounted.current) return;
    if (fetched) {
      setText(fetched);
    } else {
      index.current = nextIndex(index.current);
      setText(quotes[index.current]);
    }
    setVisible(true);
  };

  return (
    <figure className="footer-quote">
      <blockquote className={`footer-quote__text ${visible ? 'quote-in' : 'quote-out'}`} aria-live="polite">
        “{text}”
      </blockquote>
      <button type="button" className="footer-quote__button" onClick={nextQuote}>
        <Dices size={16} aria-hidden="true" />
        Another quote
      </button>
    </figure>
  );
};

export default HobbitQuoteGenerator;
