import PropTypes from 'prop-types';
import { Container, Tag } from './hashtags.css.js';

const Hashtags = ({ tags, isSmall }) =>
  tags.length > 0 ? (
    <Container>
      {tags.map((tag) => (
        <Tag key={tag} isSmall={isSmall} data-testid="Tag">
          #{tag}
        </Tag>
      ))}
    </Container>
  ) : null;

Hashtags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSmall: PropTypes.bool,
};

export default Hashtags;
