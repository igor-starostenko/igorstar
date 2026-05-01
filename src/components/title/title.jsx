import PropTypes from 'prop-types';
import { Text } from './title.css.js';

const Title = ({ children, as = 'span', size }) => {
  return (
    <Text as={as} size={size}>
      {children}
    </Text>
  );
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.string,
  size: PropTypes.oneOf(['large']),
};

export default Title;
