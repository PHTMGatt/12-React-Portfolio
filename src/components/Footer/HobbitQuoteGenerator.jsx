import { useState } from 'react';
import './QuoteAnimations.css';

// Keep the footer available offline. No private API token belongs in a browser bundle.
const quotes = [
  'Not all those who wander are lost.',
  'Even the smallest person can change the course of the future.',
  'All we have to decide is what to do with the time that is given us.',
  'There is some good in this world, and it’s worth fighting for.',
  'The road goes ever on and on.',
];
const fantasyFonts = ['Playfair Display', 'Cormorant Garamond', 'Marcellus', 'Libre Baskerville'];

export default function HobbitQuoteGenerator() {
  const [index, setIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const nextQuote = () => {
    // A bounded selection cannot hang when a source has only one quote.
    setIndex(current => (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length);
    setFontIndex(current => (current + 1) % fantasyFonts.length);
  };

  return (
    <div className="quote-container" style={{ fontFamily: `'${fantasyFonts[fontIndex]}', serif` }}>
      <p className="quote-text fade-in" key={index} aria-live="polite">“{quotes[index]}”</p>
      <button type="button" className="quote-button" onClick={nextQuote} aria-label="New Hobbit Quote">
        New Quote
      </button>
    </div>
  );
}
