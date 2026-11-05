import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Keep the built entry metadata current after client-side route changes.
// Every entry HTML already carries its own metadata, so the route table loads
// on demand instead of adding every page's description to the main bundle.
export default function usePageTitle(title) {
  const { pathname } = useLocation();
  useEffect(() => {
    let current = true;
    import('../data/pageMetadata').then(({ metadataForPath }) => {
      if (!current) return;
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
    });
    return () => {
      current = false;
    };
  }, [pathname, title]);
}
