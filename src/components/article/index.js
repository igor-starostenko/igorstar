import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'components/image';
import Hashtags from 'components/hashtags';
import {
  Card,
  SLink,
  Row,
  Thumb,
  Title,
  Description,
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
  category,
  path,
  title,
  image,
  date,
  description,
  tags,
  linkText,
}) => {
  const href = `/${category}/${path}`;

  return (
    <Card>
      {image && (
        <SLink href={href}>
          <Thumb
            style={{
              marginTop: `${index === 0 ? 0 : 5.5}rem`,
            }}
          >
            <Image
              src={image.src}
              backupSrc={image.backupSrc}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </Thumb>
        </SLink>
      )}
      <Row>
        <SLink href={href}>
          <Title as="h2">{title}</Title>
        </SLink>
        <DateText>— {formatDate(date)}</DateText>
      </Row>
      <Hashtags tags={tags} />
      <Description>
        {description} <Link href={href}>{linkText || 'Read more'}</Link>
      </Description>
      <MobileDate>— {formatDate(date)}</MobileDate>
    </Card>
  );
};

Article.propTypes = {
  index: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    backupSrc: PropTypes.string,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
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
