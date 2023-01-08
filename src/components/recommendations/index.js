import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/image';
import Hashtags from 'components/hashtags';
import { Border, Container, Row, SLink, Thumb } from './recommendations.css';

const Recommendations = ({ category, posts }) => (
  <Container>
    <h2>Read more about {category}</h2>
    <div>
      {posts.map((post) => (
        <Border key={post.id}>
          <SLink href={`/${post.category}/${post.path}`}>
            <Row>
              {post.thumbnail && (
                <Thumb>
                  <Image
                    src={post.thumbnail.src}
                    alt={post.thumbnail.description || post.title}
                    width={post.thumbnail.width}
                    height={post.thumbnail.height}
                  />
                </Thumb>
              )}
              <h3>{post.title}</h3>
              {post.tags && <Hashtags tags={post.tags} isSmall />}
              <p>
                {post.description}
                <span> {post.linkText}</span>
              </p>
            </Row>
          </SLink>
        </Border>
      ))}
    </div>
  </Container>
);

Recommendations.propTypes = {
  category: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string.isRequired,
      linkText: PropTypes.string,
      thumbnail: PropTypes.object,
    })
  ),
};

export default Recommendations;
