import PropTypes from 'prop-types';
import { Container } from './box.css';

const Box = ({ children, isMain, ...rest }) => (
  <Container $isMain={isMain} {...rest}>{children}</Container>
);

Box.propTypes = {
  children: PropTypes.node.isRequired,
  isMain: PropTypes.bool,
};

export default Box;
