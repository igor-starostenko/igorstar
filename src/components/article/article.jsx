import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { componentSizes } from 'constants/imageConfig.js';
import Hashtags from 'components/hashtags/hashtags.jsx';
import { Card, SLink, Row, Thumb, Title, Description } from './article.css.js';

const DateText = dynamic(() => import('components/date/date.jsx'), {
  ssr: false,
});

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
  date,
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
              data-sizes={componentSizes.article.sizes}
              data-priority={index === 0 ? 'true' : null}
            />
          </Thumb>
        </SLink>
      )}
      <Row>
        <SLink href={href}>
          <Title as="h2">{title}</Title>
        </SLink>
        <DateText isMobile={false} date={date} />
      </Row>
      <Hashtags tags={tags} />
      <Description>
        {description} <Link href={href}>{linkText || 'Read more'}</Link>
      </Description>
      <DateText isMobile={true} date={date} />
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
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  linkText: PropTypes.string,
};

export default Article;
