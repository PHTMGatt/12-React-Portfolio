import { useEffect, useRef, useState } from 'react';
import { Dices } from 'lucide-react';
import './QuoteAnimations.css';

const pickDifferent = (list, current) => {
  if (list.length < 2) return list[0];
  let next;
  do {
    next = list[Math.floor(Math.random() * list.length)];
  } while (next.dialog === current?.dialog);
  return next;
};

// A small Middle-earth easter egg from The One API. If the API is
// unreachable the whole block stays hidden rather than showing a stuck loader.
const HobbitQuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(true);
  const timer = useRef();

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://the-one-api.dev/v2/quote', {
      headers: { Authorization: 'Bearer 30pdImw6q06nrUVwdEpw' },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then((data) => {
        const usable = (data.docs || []).filter((q) => q.dialog && q.dialog.trim().length > 12 && q.dialog.length < 180);
        if (!usable.length) return;
        setQuotes(usable);
        setCurrent(pickDifferent(usable, null));
      })
      .catch(() => {});

    return () => {
      controller.abort();
      clearTimeout(timer.current);
    };
  }, []);

  if (!current) return null;

  const nextQuote = () => {
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCurrent((prev) => pickDifferent(quotes, prev));
      setVisible(true);
    }, 200);
  };

  return (
    <figure className="footer-quote">
      <blockquote className={`footer-quote__text ${visible ? 'quote-in' : 'quote-out'}`} aria-live="polite">
        “{current.dialog.trim()}”
      </blockquote>
      <button type="button" className="footer-quote__button" onClick={nextQuote}>
        <Dices size={16} aria-hidden="true" />
        Another quote
      </button>
    </figure>
  );
};

export default HobbitQuoteGenerator;
