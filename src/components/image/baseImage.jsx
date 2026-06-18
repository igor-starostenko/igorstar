import { useState } from 'react';
import PropTypes from 'prop-types';
import { SImage } from './image.css.js';

const sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */
const addContentfulParams = (url, width, height) => {
  if (!url || !width || !height) return url;
  if (!url.includes('images.ctfassets.net')) return url;

  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    u.searchParams.set('h', String(height));
    return u.toString();
  } catch {
    // Fallback: just append params without URL parsing
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&h=${height}`;
  }
};

const BaseImage = ({
  alt,
  src,
  backupSrc = '',
  fill,
  unoptimized,
  loading,
  width,
  height,
  sizes: customSizes,
  ...rest
}) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    /* eslint-disable @next/next/no-img-element */
    // If backupSrc is empty/falsy, render nothing instead of broken image
    if (!backupSrc) return null;
    // Filter out Next.js-specific props that aren't valid on <img>
    const { fill, unoptimized, priority, ...domRest } = rest;
    // Pass through explicit dimensions and loading when available to preserve caller's sizing intent
    return (
      <img
        src={backupSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        {...domRest}
      />
    );
  }

  // Next.js Image requires width/height unless using fill
  // When fill is used, we don't need width/height but sizes is still required for optimization
  // Filter out props that should not be passed to DOM elements (fill, unoptimized are Next.js specific)
  const optimizedSrc = !unoptimized && width && height
    ? addContentfulParams(src, width, height)
    : src;
  
  const imageProps = {
    src: optimizedSrc,
    alt,
    loading,
    unoptimized,
    sizes: customSizes || sizes,
    onError: () => setIsError(true),
  };

  // For non-fill mode with explicit dimensions, add width/height
  if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  } else if (fill) {
    // For fill mode, add the fill prop
    imageProps.fill = true;
  }

  // For fill mode, render SImage directly to preserve parent height inheritance
  return <SImage {...imageProps} {...rest} />;
};

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
};

export default BaseImage;
