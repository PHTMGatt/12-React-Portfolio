import { useState } from 'react';

// Real project screenshot, or an honest typographic summary when no real
// capture exists yet. Both fill the parent's fixed 16:9 box, so cards never
// shift while images load. The summary repeats text that is already next to
// it on every page, so it is hidden from assistive technology.
const ProjectImage = ({ image, alt, sizes, eager = false, className = '', title, stack = [], summary }) => {
  const [failedSrc, setFailedSrc] = useState(null);
  const imageUnavailable = !image || failedSrc === image.src;

  if (imageUnavailable) {
    return (
      <div className={`project-fallback ${className}`.trim()} aria-hidden="true">
        {stack.length > 0 && <p className="project-fallback__stack">{stack.join(' · ')}</p>}
        <p className="project-fallback__title">{title}</p>
        {summary && <p className="project-fallback__summary">{summary}</p>}
      </div>
    );
  }

  // A detail capture is shown at its own shape (see Global.css). Reserve that
  // shape before the file arrives, or a lazy-loaded capture starts at zero
  // height and pushes everything below it down when it loads.
  const detail = image.fit === 'detail';
  const reserveShape = detail && image.width && image.height ? { aspectRatio: `auto ${image.width} / ${image.height}` } : undefined;

  return (
    <img
      className={`project-shot${detail ? ' project-shot--detail' : ''} ${className}`.trim()}
      style={reserveShape}
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailedSrc(image.src)}
    />
  );
};

export default ProjectImage;
