import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const noOptimization = ({ src }) => src;

const BaseImage = ({ alt, src, ...rest }) => (
  <Image
    alt={alt}
    src={src}
    {...(process.env.IMAGE_OPTIMIZATION
      ? {} // image optimization is enabled by default with SSR
      : {
          loader: noOptimization,
          unoptimized: true,
        })}
    {...rest}
  />
);

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default BaseImage;