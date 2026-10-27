import { useRef, useState } from 'react';
import { Dices } from 'lucide-react';
import './QuoteAnimations.css';

// A small Middle-earth easter egg. The quotes ship with the site, so the footer
// works offline and no private API token ever ends up in the browser bundle.
const quotes = [
  'Not all those who wander are lost.',
  'Even the smallest person can change the course of the future.',
  'All we have to decide is what to do with the time that is given us.',
  'There is some good in this world, and it’s worth fighting for.',
  'The road goes ever on and on.',
];

// A bounded pick that always moves to a different quote and cannot loop forever.
const nextIndex = (current) => (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length;

const HobbitQuoteGenerator = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef();

  const nextQuote = () => {
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIndex(nextIndex);
      setVisible(true);
    }, 200);
  };

  return (
    <figure className="footer-quote">
      <blockquote className={`footer-quote__text ${visible ? 'quote-in' : 'quote-out'}`} aria-live="polite">
        “{quotes[index]}”
      </blockquote>
      <button type="button" className="footer-quote__button" onClick={nextQuote}>
        <Dices size={16} aria-hidden="true" />
        Another quote
      </button>
    </figure>
  );
};

export default HobbitQuoteGenerator;
