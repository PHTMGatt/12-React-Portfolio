import { useEffect } from 'react';

const SITE = 'Bryen Gatt';

// Sets a descriptive document title per route ("Work — Bryen Gatt").
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Full-Stack Developer`;
  }, [title]);
}
