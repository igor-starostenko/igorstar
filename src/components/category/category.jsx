import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Filter from 'components/filter/filter.jsx';
import Article from 'components/article/article.jsx';

const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const Category = ({ title, posts, pageSize = 5 }) => {
  const totalPages = Math.ceil(posts.total / pageSize);
  const router = useRouter();
  const pageNum = parseInt(router.query.page);
  const [displayCount, setDisplayCount] = useState(
    pageNum ? pageNum * pageSize : pageSize
  );
  const lastItemRef = useRef(null);

  // Preserve scroll position when displayCount changes
  useEffect(() => {
    const previousScrollPosition = window.scrollY;
    
    // Use requestAnimationFrame to restore position after DOM update
    const animationFrameId = requestAnimationFrame(() => {
      // Only scroll if we're close to the bottom (within 200px)
      const distanceFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      
      if (distanceFromBottom < 200) {
        // Restore to maintain visual position
        window.scrollTo(0, previousScrollPosition);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [displayCount]);

  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && displayCount < posts.total) {
          const newDisplayCount = displayCount + pageSize;
          setDisplayCount(
            newDisplayCount > posts.total ? posts.total : newDisplayCount
          );
        }
      });
    },
    [displayCount, posts.total, pageSize]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '200px 0px 200px 0px',
    });

    const element = lastItemRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [handleIntersection]);

  const startIndex = pageNum ? pageNum * pageSize - pageSize : 0;
  const displayPosts = posts.items.slice(startIndex, startIndex + displayCount);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box isMain>
        <Filter
          path={router.asPath}
          title={title}
          displayCount={displayPosts.length}
          totalCount={posts.total}
        />
        <div>
          {displayPosts.map((post, index) => (
            <Article
              key={post.id}
              index={index}
              image={post.thumbnail}
              category={post.category}
              path={post.path}
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
              linkText={post.linkText}
            />
          ))}
          {/* Sentinel element for IntersectionObserver */}
          {displayPosts.length < posts.total - (pageNum || 1) * pageSize && (
            <div ref={lastItemRef} />
          )}
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

Category.propTypes = {
  pageSize: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  posts: PropTypes.shape({
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        thumbnail: PropTypes.shape({
          src: PropTypes.string.isRequired,
          backupSrc: PropTypes.string,
          alt: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
        }),
        category: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        linkText: PropTypes.string,
      }).isRequired
    ),
  }).isRequired,
};

export default Category;
