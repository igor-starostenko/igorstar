import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/box';
import Image from 'components/image';

const Selfie = ({ fluid, ...rest }) => (
  <Box style={{ padding: '2rem 0 0 0' }} {...rest}>
    <Image
      style={{
        cursor: 'initial',
        borderRadius: '50%',
        border: '2px solid powderblue',
        height: '100px',
        width: '100px',
      }}
      fluid={fluid}
      alt="Selfie"
    />
  </Box>
);

Selfie.propTypes = {
  fluid: PropTypes.object.isRequired,
};

export default Selfie;
