import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'components/image/image.jsx';
import PropTypes from 'prop-types';
import { componentSizes } from 'constants/imageConfig.js';
import Hashtags from 'components/hashtags/hashtags.jsx';
import { Card, SLink, Row, Thumb, Title, Description } from './article.css.js';
import { ContentDetails } from 'components/layout/layout.css.js';

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
      {image && image.src && (
        <SLink href={href}>
          <Thumb className={index === 0 ? 'first' : ''}>
            <Image
              src={image.src}
              backupSrc={image.backupSrc}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={componentSizes.article.sizes}
              loading={index === 0 ? 'eager' : 'lazy'}
              preload={index === 0}
              quality={30}
              blurDataURL={image.blurDataURL}
              placeholder={image.blurDataURL ? 'blur' : undefined}
            />
          </Thumb>
        </SLink>
      )}
      <ContentDetails>
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
      </ContentDetails>
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
