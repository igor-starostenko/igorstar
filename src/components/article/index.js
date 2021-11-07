import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'components/image';
import {
  Card,
  SLink,
  Row,
  Thumb,
  Title,
  Description,
  Tags,
  Tag,
  Date as DateText,
  MobileDate,
} from './article.css.js';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Article = ({
  index,
  path,
  title,
  image,
  date,
  description,
  tags,
  linkText,
}) => {
  const href = `/posts/${path}`;

  return (
    <Card>
      {image && (
        <SLink href={href}>
          <a>
            <Thumb
              style={{
                marginTop: `${index === 0 ? 0 : 5.5}rem`,
              }}
            >
              <Image
                src={`https:${image.file.url}`}
                alt={title}
                {...image.file.details.image}
              />
            </Thumb>
          </a>
        </SLink>
      )}
      <Row>
        <SLink href={href}>
          <a>
            <Title as="h2">{title}</Title>
          </a>
        </SLink>
        <DateText>— {formatDate(date)}</DateText>
      </Row>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </Tags>
      <Description>
        {description}{' '}
        <Link href={href}>
          <a>{linkText || 'Read more'}</a>
        </Link>
      </Description>
      <MobileDate>{date}</MobileDate>
    </Card>
  );
};

Article.propTypes = {
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
  linkText: PropTypes.string,
};

Article.defaultProps = {
  tags: [],
  image: null,
};

export default Article;
