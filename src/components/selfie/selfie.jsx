import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Image = dynamic(() => import('components/image/image.jsx'));

const Selfie = ({ src, ...rest }) => (
  <Image height={100} width={100} src={src} alt="Selfie" priority {...rest} />
);

Selfie.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Selfie;
