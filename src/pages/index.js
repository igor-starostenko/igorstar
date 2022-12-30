import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getEntries, parseFields } from 'contentClient';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Filter from 'components/filter';
import Article from 'components/article';
import Pagination from 'components/pagination';

const Index = ({ page, posts }) => {
  const pageSize = 10;
  const totalPages = Math.ceil(posts.total / pageSize);
  const router = useRouter();
  const pageNum = parseInt(router.query.page);
  const [displayCount, setDisplayCount] = useState(
    pageNum ? pageNum * pageSize : pageSize
  );

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    // To get page offset of last article
    const lastRecordLoaded = document.querySelector('div > article:last-child');
    if (lastRecordLoaded) {
      const lastRecordLoadedOffset =
        lastRecordLoaded.offsetTop + lastRecordLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      // Detects when last record is in view
      if (pageOffset > lastRecordLoadedOffset) {
        if (displayCount < posts.total) {
          const newDisplayCount = displayCount + pageSize;
          setDisplayCount(
            newDisplayCount > posts.total ? posts.total : newDisplayCount
          );
        }
      }
    }
  };

  const startIndex = pageNum ? pageNum * pageSize - pageSize : 0;
  const displayPosts = posts.items.slice(startIndex, startIndex + displayCount);

  return (
    <Layout>
      <Head pageTitle={page.title} />
      <Box>
        <Filter
          title={page.title}
          displayCount={displayPosts.length}
          totalCount={posts.total}
        />
        <div>
          {displayPosts.map((post, index) => (
            <Article
              key={post.id}
              index={index}
              image={post.thumbnail}
              path={post.path}
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
              linkText={post.linkText}
            />
          ))}
        </div>
        {displayPosts.length < posts.total - (pageNum || 1) * pageSize ? (
          <Pagination pageNum={pageNum || 1} totalPages={totalPages} />
        ) : (
          ''
        )}
      </Box>
    </Layout>
  );
};

Index.propTypes = {
  page: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        layout: PropTypes.string.isRequired,
        draft: PropTypes.bool.isRequired,
        category: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string.isRequired,
      }).isRequired
    ),
    linkText: PropTypes.string,
  }).isRequired,
};

export default Index;

export const getStaticProps = async () => {
  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  let posts = { items: [] };
  // Ensure we load all posts, regardless of the API limit
  while (posts.total != 0 && posts.items.length < (posts.total || 1)) {
    let response = await getEntries({
      content_type: 'post',
      order: '-fields.date',
      limit: 1000, // 1000 is the max
      skip: posts.items.length,
    });
    posts = { ...response, items: [...posts.items, ...response.items] };
  }

  return {
    props: {
      page: pages.items[0] || {},
      posts: {
        ...posts,
        /* eslint-disable no-unused-vars */
        items: posts.items.map(({ thumbnail, images, ...fields }) => ({
          thumbnail: parseFields(thumbnail),
          ...fields,
        })),
      },
    },
  };
};
