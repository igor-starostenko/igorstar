import React from 'react';
import PropTypes from 'prop-types';
import { SLink, Title, Tags, Tag, Date } from './card.css.js';

const Card = ({ slug, title, date, tags }) => (
  <SLink to={slug}>
    <Title>{title}</Title>
    <Tags>
      {tags.map(tag => (
        <Tag key={tag}>#{tag}</Tag>
      ))}
    </Tags>
    <Date>{date}</Date>
  </SLink>
);

Card.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  tags: [],
};

export default Card;
