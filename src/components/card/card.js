import React from 'react';
import PropTypes from 'prop-types';
import { SLink, SImg, Row, Title, Tags, Tag, Date } from './card.css.js';

const Card = ({ slug, title, image, date, tags }) => (
  <SLink to={slug}>
    {image && <SImg fluid={image.fluid} alt={title} />}
    <Row>
      <Title>{title}</Title>
      <Date>— {date}</Date>
    </Row>
    <Tags>
      {tags.map(tag => (
        <Tag key={tag}>#{tag}</Tag>
      ))}
    </Tags>
  </SLink>
);

Card.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    fluid: PropTypes.object,
  }),
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  tags: [],
  image: null,
};

export default Card;
