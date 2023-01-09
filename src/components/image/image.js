import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SImage } from './image.css';

/* For contentful query params see
  https://www.contentful.com/developers/docs/references/images-api/#/reference
 */
const BaseImage = ({ alt, src, backupSrc, ...rest }) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    /* eslint-disable @next/next/no-img-element */
    return <img src={backupSrc} alt={alt} {...rest} />;
  }

  return (
    <SImage src={src} alt={alt} onError={() => setIsError(true)} {...rest} />
  );
};

BaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
};

export default BaseImage;
