import PropTypes from 'prop-types';
import Hashtags from 'components/hashtags/hashtags.jsx';
import { componentSizes } from 'constants/imageConfig.js';
import {
  Container,
  Card,
  SLink,
  ThumbWrapper,
  Thumb,
  Details,
} from './recommendations.css.js';

const Recommendations = ({ category, posts }) => (
  <Container>
    <h2>Read more about {category}</h2>
    <div>
      {posts.map((post) => (
        <SLink href={`/${post.category}/${post.path}`} key={post.id}>
          <Card>
            {post.thumbnail?.src && (
              <ThumbWrapper>
                <Thumb
                  src={post.thumbnail.src}
                  backupSrc={post.thumbnail.backupSrc}
                  alt={post.thumbnail.alt || post.title}
                  fill
                  sizes={componentSizes.recommendations.sizes}
                />
              </ThumbWrapper>
            )}
            <Details>
              <h3>{post.title}</h3>
              {post.tags && <Hashtags tags={post.tags} isSmall />}
              <p>
                {post.description}
                <span> {post.linkText}</span>
              </p>
            </Details>
          </Card>
        </SLink>
      ))}
    </div>
  </Container>
);

Recommendations.propTypes = {
  category: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      linkText: PropTypes.string,
      thumbnail: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        backupSrc: PropTypes.string,
      }),
    })
  ),
};

export default Recommendations;
