import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'components/image/image.jsx';
import Hashtags from 'components/hashtags/hashtags.jsx';
import { Card, SLink, Row, Thumb, Title, Description } from './article.css.js';

const DateText = dynamic(() => import('components/date/date.jsx'), {
  ssr: false,
});

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

  return (
    <Card>
      {image && (
        <SLink href={href}>
          <Thumb className={index === 0 ? 'first' : ''}>
            {/* Calculate display-appropriate dimensions based on CSS max-height (~41rem/656px) */}
            {/* Use 800x450 as max for thumbnails - larger than typical display needs but smaller than full resolution */}
            <Image
              src={image.src}
              backupSrc={image.backupSrc}
              alt={image.alt}
              width={Math.min(image.width, 800)}
              height={Math.min(image.height, 450)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
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
    backupSrc: PropTypes.string,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  linkText: PropTypes.string,
};

export default Article;
