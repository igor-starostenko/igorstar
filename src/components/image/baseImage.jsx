import { useState } from 'react';
import PropTypes from 'prop-types';
import { SImage } from './image.css.js';

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
  ...rest
}) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    if (!backupSrc) return null;
    const { priority: _priority, ...domRest } = rest;
    // eslint-disable-next-line @next/next/no-img-element
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

  const imageProps = {
    src,
    alt,
    loading,
    sizes,
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

  return <SImage {...imageProps} {...rest} />;
};

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
};

export default BaseImage;
