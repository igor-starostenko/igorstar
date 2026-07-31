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

const pageSize = 10;

/** @param {Object} props
 *  @param {string} props.title - Page title
 *  @param {Object} props.data - Data object with limit, total, images
 */
const PaginatedGallery = ({ title, data }) => {
  const router = useRouter();
  const totalPages = Math.ceil((data.images?.length || 0) / pageSize);
  const pageNum = parseInt(router.query.page) || 1;
  const [displayCount, setDisplayCount] = useState(
    pageNum ? pageNum * pageSize : pageSize
  );

  const images = data.images || [];

  // Only update displayCount on scroll if we haven't reached the end
  const handleScroll = useCallback(() => {
    if (displayCount >= data.total) return;

    const lastRecordLoaded = document.querySelector(
      'div > div:last-child > div:last-child'
    );
    if (lastRecordLoaded) {
      const lastRecordLoadedOffset =
        lastRecordLoaded.offsetTop + lastRecordLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastRecordLoadedOffset) {
        const newDisplayCount = Math.min(displayCount + pageSize, data.total);
        setDisplayCount(newDisplayCount);
      }
    }
  }, [displayCount, data.total]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // startIndex is determined by the current page number
  const startIndex = pageNum > 1 ? (pageNum - 1) * pageSize : 0;
  // Show images from startIndex, up to displayCount items
  const endIndex = Math.min(startIndex + displayCount, images.length);
  const displayImages = images.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head pageTitle={title} />
      <Box>
        {displayImages.length > 0 && (
          <Gallery photos={displayImages} targetRowHeight={250} />
        )}
        {pageNum < totalPages ? (
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
  data: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default PaginatedGallery;
