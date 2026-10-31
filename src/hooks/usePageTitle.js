import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metadataForPath } from '../data/pageMetadata';

// Keep the built entry metadata current after client-side route changes.
export default function usePageTitle(title) {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = metadataForPath(pathname);
    const pageTitle = metadata?.title || (title ? `${title} — Bryen Gatt` : 'Bryen Gatt — Full-Stack Developer');
    document.title = pageTitle;
    const values = {
      'meta[name="description"]': metadata?.description || 'The requested page could not be found.',
      'meta[property="og:title"]': pageTitle,
      'meta[name="twitter:title"]': pageTitle,
      'meta[property="og:description"]': metadata?.description || 'The requested page could not be found.',
      'meta[name="twitter:description"]': metadata?.description || 'The requested page could not be found.',
      'meta[property="og:url"]': metadata?.canonical,
      'meta[name="robots"]': metadata ? 'index, follow' : 'noindex, nofollow',
    };
    for (const [selector, value] of Object.entries(values)) {
      const element = document.querySelector(selector);
      if (value) element?.setAttribute('content', value);
      else element?.removeAttribute('content');
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (metadata) canonical?.setAttribute('href', metadata.canonical);
    else canonical?.removeAttribute('href');
  }, [pathname, title]);
}
