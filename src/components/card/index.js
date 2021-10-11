import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'components/image';
import {
  SLink,
  Row,
  Title,
  Description,
  Tags,
  Tag,
  Date,
  MobileDate,
} from './card.css.js';

const Card = ({ index, slug, title, image, date, description, tags }) => (
  <Fragment>
    {image && (
      <SLink href={slug}>
        <a>
          <Image
            style={{ margin: `${index === 0 ? 0 : 5.5}rem -3.9rem 0rem` }}
            fluid={image.fluid}
            alt={title}
          />
        </a>
      </SLink>
    )}
    <Row>
      <SLink href={slug}>
        <a>
          <Title>{title}</Title>
        </a>
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
      <Link as="span" href={slug}>
        <a>Read more</a>
      </Link>
    </Description>
    <MobileDate>{date}</MobileDate>
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
