import React, { useEffect, useState } from 'react';
import './QuoteAnimations.css';

const HobbitQuoteGenerator = () => {
  const fantasyFonts = [
    'Playfair Display',
    'Cormorant Garamond',
    'Marcellus',
    'Libre Baskerville',
  ];

  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [font, setFont] = useState(fantasyFonts[0]);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const fetchQuotes = async () => {
    try {
      const res = await fetch('https://the-one-api.dev/v2/quote', {
        headers: {
          Authorization: 'Bearer 30pdImw6q06nrUVwdEpw',
        },
      });
      const data = await res.json();
      const filteredQuotes = data.docs.filter(
        (q) => q.dialog && q.dialog.length < 200
      );
      setQuotes(filteredQuotes);
      getRandomQuote(filteredQuotes);
    } catch (err) {
      console.error('Error fetching LOTR quotes:', err);
    }
  };

  const getRandomQuote = (quoteList = quotes) => {
    if (!quoteList.length) return;
    let newQuote;
    do {
      newQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
    } while (newQuote.dialog === currentQuote?.dialog);

    const randomFont = fantasyFonts[Math.floor(Math.random() * fantasyFonts.length)];

    setFadeClass('fade-out');
    setTimeout(() => {
      setFont(randomFont);
      setCurrentQuote(newQuote);
      setFadeClass('fade-in');
    }, 250);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="quote-container" style={{ fontFamily: `'${font}', serif` }}>
      <p className={`quote-text ${fadeClass}`}>
        {currentQuote ? `“${currentQuote.dialog}”` : 'Loading quote...'}
      </p>
      <button className="quote-button" onClick={() => getRandomQuote()} aria-label="New Hobbit Quote">
        🎲 New Quote
      </button>
    </div>
  );
};

export default HobbitQuoteGenerator;
