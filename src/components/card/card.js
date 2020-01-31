import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { SLink, Row, Title, Description, Tags, Tag, Date } from './card.css.js';
import Image from 'components/image';

const Card = ({ index, slug, title, image, date, description, tags }) => (
  <Fragment>
    {image && (
      <SLink to={slug}>
        <Image
          style={{ margin: `${index === 0 ? 0 : 5.5}rem -3.9rem 0rem` }}
          fluid={image.fluid}
          alt={title}
        />
      </SLink>
    )}
    <Row>
      <SLink to={slug}>
        <Title>{title}</Title>
      </SLink>
      <Date>— {date}</Date>
    </Row>
    <Tags>
      {tags.map(tag => (
        <Tag key={tag}>#{tag}</Tag>
      ))}
    </Tags>
    <Description>
      {description}{' '}
      <Link as="span" to={slug}>
        Read more
      </Link>
    </Description>
  </Fragment>
);

Card.propTypes = {
  index: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
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
