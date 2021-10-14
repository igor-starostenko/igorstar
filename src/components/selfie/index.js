import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/box';
import Image from 'next/image';
// import Image from 'components/image';

const Selfie = ({ src, ...rest }) => (
  <Box style={{ padding: '2rem 4rem 0rem 4rem' }} {...rest}>
    <Image
      style={{
        cursor: 'initial',
        borderRadius: '50%',
        border: '2px solid powderblue',
        height: '100px',
        width: '100px',
      }}
      height={100}
      width={100}
      src={src}
      alt="Selfie"
    />
  </Box>
);

Selfie.propTypes = {
  src: PropTypes.object.isRequired,
};

export default Selfie;
