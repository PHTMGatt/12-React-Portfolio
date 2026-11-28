import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// What react-router's <ScrollRestoration> did, without the data router it
// needs: new pages start at the top (or at their #hash target), and Back /
// Forward return to where the reader was. Positions survive a reload.
const STORE = 'scroll-positions';
const USER_SCROLL = ['wheel', 'touchstart', 'keydown', 'pointerdown'];

// The site sets scroll-behavior: smooth for in-page links; a page change
// should land at once, as a real page load does.
const jump = (top) => window.scrollTo({ top, left: 0, behavior: 'instant' });

// The first entry of every document load shares the key 'default', so the
// path is part of the id, and a fresh visit (typed URL, new tab) starts at
// the top; only a reload or Back/Forward into the site restores.
const idOf = ({ key, pathname, search }) => `${key}:${pathname}${search}`;
let firstPage = true;
const arrivedByHistory = () => {
  const type = performance.getEntriesByType?.('navigation')[0]?.type;
  return type === 'reload' || type === 'back_forward';
};

const load = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORE)) || {};
  } catch {
    return {};
  }
};

export default function useScrollRestoration() {
  const location = useLocation();
  const { hash } = location;
  const id = idOf(location);
  const navigationType = useNavigationType();
  const positions = useRef(null);
  const currentId = useRef(id);
  const restoring = useRef(false);

  useLayoutEffect(() => {
    positions.current = load();
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    let frame = 0;
    const record = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!restoring.current) positions.current[currentId.current] = window.scrollY;
      });
    };
    const persist = () => {
      try {
        sessionStorage.setItem(STORE, JSON.stringify(positions.current));
      } catch {
        // Storage can be unavailable (private mode); in-memory still works.
      }
    };
    window.addEventListener('scroll', record, { passive: true });
    window.addEventListener('pagehide', persist);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', record);
      window.removeEventListener('pagehide', persist);
    };
  }, []);

  useLayoutEffect(() => {
    currentId.current = id;
    const saved = positions.current?.[id];
    const fromHistory = firstPage ? arrivedByHistory() : navigationType === 'POP';
    firstPage = false;
    if (fromHistory && saved != null) {
      // A lazy page is still loading on Back, so the document may be too short
      // to reach the saved spot. Keep scrolling there as it grows, for a short
      // while, unless the reader starts scrolling first.
      restoring.current = true;
      jump(saved);
      const observer = new ResizeObserver(() => jump(saved));
      const stop = () => {
        restoring.current = false;
        observer.disconnect();
        clearTimeout(timer);
        for (const type of USER_SCROLL) window.removeEventListener(type, stop);
      };
      const timer = setTimeout(stop, 1500);
      observer.observe(document.body);
      for (const type of USER_SCROLL) window.addEventListener(type, stop, { passive: true });
      return stop;
    }
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else jump(0);
  }, [id, hash, navigationType]);
}
