import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';

const Gallery = dynamic(() => import('components/gallery/gallery.jsx'));
const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const PaginatedGallery = ({ title, total, images, pageSize, targetRowHeight }) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const totalPages = Math.ceil((images?.length || 0) / pageSize);

  const [displayCount=pageSize, setDisplayCount] = useState();

  // Only update displayCount on scroll if we haven't reached the end
  const handleScroll = useCallback(() => {
    if (displayCount >= total) return;

    const lastRecordLoaded = document.querySelector(
      'div > div:last-child > div:last-child'
    );
    if (lastRecordLoaded) {
      const lastRecordLoadedOffset =
        lastRecordLoaded.offsetTop + lastRecordLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastRecordLoadedOffset) {
        const newDisplayCount = Math.min(displayCount + pageSize, total);
        setDisplayCount(newDisplayCount);
      }
    }
  }, [displayCount, total]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const pageNum = Math.ceil(displayCount / pageSize) || 1;

  // Don't show pagination if we've loaded all items (reached the end)
  const hasMoreItems = displayCount < total;

  const startIndex = page > 1 ? (page - 1) * pageSize : 0;
  // Show images from startIndex, up to displayCount items
  const endIndex = Math.min(startIndex + displayCount, images.length);
  const displayImages = images.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        {displayImages.length > 0 && (
          <Gallery photos={displayImages} targetRowHeight={targetRowHeight} />
        )}
        {hasMoreItems && pageNum < totalPages ? (
          <Pagination pageNum={pageNum} totalPages={totalPages} />
        ) : (
          ''
        )}
      </Box>
    </Layout>
  );
};

PaginatedGallery.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  targetRowHeight: PropTypes.number.isRequired,
};

export default PaginatedGallery;
