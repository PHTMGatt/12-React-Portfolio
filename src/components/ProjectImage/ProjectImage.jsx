// Responsive project screenshot: serves the 640px variant to small screens
// and reserves its box up front so cards never shift while images load.
const ProjectImage = ({ image, alt, sizes, eager = false, className = '' }) => (
  <img
    className={className}
    src={image.src}
    srcSet={image.srcSmall ? `${image.srcSmall} 640w, ${image.src} 1280w` : undefined}
    sizes={sizes}
    width={image.width}
    height={image.height}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={eager ? 'high' : undefined}
  />
);

export default ProjectImage;
