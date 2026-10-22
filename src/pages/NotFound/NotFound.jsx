import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page not found — Bryen Gatt';
  }, []);

  return (
    <section className="container not-found page-enter">
      <span className="not-found__code">404</span>
      <h1 className="page-title">This page wandered off.</h1>
      <p>The link may be outdated, or the page may have moved. Everything worth seeing is one click away.</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={18} aria-hidden="true" />
          Back home
        </Link>
        <Link to="/work" className="btn btn-secondary">
          View work
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
