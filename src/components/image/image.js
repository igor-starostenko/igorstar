import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const noOptimization = ({ src }) => src;

/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */
const BaseImage = ({ alt, src, query = '?fm=webp', ...rest }) => (
  <Image
    alt={alt}
    src={src + query}
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
  query: PropTypes.string,
};

export default BaseImage;
