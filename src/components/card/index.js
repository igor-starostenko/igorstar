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
  Date as DateText,
  MobileDate,
} from './card.css.js';

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Card = ({ index, path, title, image, date, description, tags }) => (
  <Fragment>
    {image && (
      <SLink href={`/${path}`}>
        <a>
          <Image
            style={{
              margin: `${index === 0 ? 0 : 5.5}rem -3.9rem 0rem`,
            }}
            src={`https:${image.file.url}`}
            alt={title}
            {...image.file.details.image}
          />
        </a>
      </SLink>
    )}
    <Row>
      <SLink href={`/${path}`}>
        <a>
          <Title>{title}</Title>
        </a>
      </SLink>
      <DateText>— {formatDate(date)}</DateText>
    </Row>
    <Tags>
      {tags.map(tag => (
        <Tag key={tag}>#{tag}</Tag>
      ))}
    </Tags>
    <Description>
      {description}{' '}
      <Link href={`/${path}`}>
        <a>Read more</a>
      </Link>
    </Description>
    <MobileDate>{date}</MobileDate>
  </Fragment>
);

Card.propTypes = {
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string.isRequired,
      details: PropTypes.shape({
        image: PropTypes.shape({
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }),
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  tags: [],
  image: null,
};

export default Card;
