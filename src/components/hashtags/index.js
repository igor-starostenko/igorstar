import PropTypes from 'prop-types';
import { Container, Tag } from './hashtags.css';

const Hashtags = ({ tags, isSmall }) => (
  <Container>
    {tags.map((tag) => (
      <Tag key={tag} isSmall={isSmall}>
        #{tag}
      </Tag>
    ))}
  </Container>
);

Hashtags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSmall: PropTypes.bool,
};

export default Hashtags;
