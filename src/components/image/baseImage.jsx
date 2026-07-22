/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import PropTypes from 'prop-types';
import NextImage from 'next/image';

const BaseImage = ({
  alt,
  src,
  backupSrc = '',
  fill,
  loading,
  width,
  height,
  sizes,
  placeholder,
  blurDataURL,
  priority = false,
  unoptimized = true, // Default to unoptimized for static assets
  ...rest
}) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    if (!backupSrc) return null;
    const { priority: _priority, ...domRest } = rest;
    return (
      <NextImage
        src={backupSrc}
        alt={alt}
        loading={loading}
        width={width || 1}
        height={height || 1}
        unoptimized
        {...domRest}
      />
    );
  }

  const imageProps = {
    src,
    alt,
    loading,
    sizes,
    priority,
    unoptimized,
    onError: () => setIsError(true),
    placeholder,
    blurDataURL,
  };

  // Next.js requires width/height OR fill for NextImage
  // If no width/height provided, use a minimal default with unoptimized
  if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  } else if (fill) {
    imageProps.fill = true;
  } else {
    // Use minimal width/height with unoptimized when neither provided
    imageProps.width = 1;
    imageProps.height = 1;
  }

  return <NextImage {...imageProps} {...rest} />;
};

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
};

export default BaseImage;
