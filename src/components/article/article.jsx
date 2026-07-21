import Link from 'next/link';
import Hashtags from 'components/hashtags/hashtags.jsx';
import { Card, SLink, Row, Thumb, Title, Description } from './article.css.js';
import { sizes, componentSizes } from 'constants/imageConfig.js';
import PropTypes from 'prop-types';

const calculateConstrainedDimensions = (width, height, maxWidth, maxHeight) => {
  const scale = Math.min(maxWidth / width, maxHeight / height, 1);
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

const Article = ({
  index,
  category,
  path,
  title,
  image = null,
  description,
  tags = [],
  linkText,
}) => {
  const href = `/${category}/${path}`;
  const { width, height } = image
    ? calculateConstrainedDimensions(
        image.width,
        image.height,
        componentSizes.article.maxWidth,
        componentSizes.article.maxHeight
      )
    : { width: null, height: null };

  return (
    <Card>
      {image && image.src && (
        <SLink href={href}>
          <Thumb className={index === 0 ? 'first' : ''}>
            <img
              data-testid="mock-image"
              src={image.src}
              alt={image.alt}
              width={width}
              height={height}
              data-sizes={sizes.article}
              data-priority={index === 0 ? 'true' : null}
            />
          </Thumb>
        </SLink>
      )}
      <Row>
        <SLink href={href}>
          <Title as="h2">{title}</Title>
        </SLink>
      </Row>
      <Hashtags tags={tags} />
      <Description>
        {description} <Link href={href}>{linkText || 'Read more'}</Link>
      </Description>
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
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
  linkText: PropTypes.string,
};

export default Article;
