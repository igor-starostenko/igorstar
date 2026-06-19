import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'components/image/image.jsx';
import Hashtags from 'components/hashtags/hashtags.jsx';
import { sizes as defaultSizes } from 'constants/imageConfig.js';
import { Card, SLink, Row, Thumb, Title, Description } from './article.css.js';

const DateText = dynamic(() => import('components/date/date.jsx'), {
  ssr: false,
});

// Calculate constrained dimensions for image display
// Preserves aspect ratio while respecting max width/height constraints
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
    ? calculateConstrainedDimensions(image.width, image.height, 1200, 800)
    : { width: null, height: null };

  // Note: blurDataURL is now pre-generated in getStaticProps and passed via props

  if (!image) {
    // If no image is provided, render only the content without thumb/link
    return (
      <Card>
        <Row>
          <Title as="h2">{title}</Title>
          <DateText isMobile={false} date={date} />
        </Row>
        <Hashtags tags={tags} />
        <Description>{description}</Description>
        <DateText isMobile={true} date={date} />
      </Card>
    );
  }

  return (
    <Card>
      <SLink href={href}>
        <Thumb className={index === 0 ? 'first' : ''}>
          {/* Calculate display-appropriate dimensions based on CSS max-height (~41rem/656px) */}
          <Image
            src={image.src}
            backupSrc={image.backupSrc}
            alt={image.alt}
            width={width}
            height={height}
            sizes={defaultSizes}
            priority={index === 0}
            blurDataURL={image.blurDataURL}
            placeholder="blur"
          />
        </Thumb>
      </SLink>
      <Row>
        <Title as="h2">{title}</Title>
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
    backupSrc: PropTypes.string,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    blurDataURL: PropTypes.string,
  }),
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  linkText: PropTypes.string,
};

export default Article;
