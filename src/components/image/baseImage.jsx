import { useState } from 'react';
import PropTypes from 'prop-types';
import { SImage } from './image.css.js';

const sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */
const BaseImage = ({ alt, src, backupSrc = '', fill, unoptimized, priority, loading, ...rest }) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    /* eslint-disable @next/next/no-img-element */
    // If backupSrc is empty/falsy, render nothing instead of broken image
    if (!backupSrc) return null;
    return <img src={backupSrc} alt={alt} {...rest} />;
  }

  // Next.js Image requires width/height unless using fill
  // When fill is used, we don't need width/height but sizes is still required for optimization
  // Filter out props that should not be passed to DOM elements (fill, unoptimized are Next.js specific)
  const imageProps = {
    src,
    alt,
    onError: () => setIsError(true),
    ...(fill ? { fill, sizes } : {}),
  };

  return <SImage {...imageProps} {...rest} />;
};

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
};

export default BaseImage;
