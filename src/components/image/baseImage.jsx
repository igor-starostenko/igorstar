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
  unoptimized = !src.includes('images.ctfassets.net'),
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
        width={width}
        height={height}
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

  if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  } else if (fill) {
    imageProps.fill = true;
  }

  return <NextImage {...imageProps} {...rest} />;
};

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
};

export default BaseImage;
