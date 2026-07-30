import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';
import { ContentDetails } from 'components/layout/layout.css.js';

const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const pageSize = 12;

/**
 * Reusable image grid page component with pagination support
 * @param {Object} props
 * @param {Object} props.page - Page metadata from Contentful
 * @param {Object} props.data - Data object containing images array and metadata
 * @param {Function} props.formatImage - Optional function to format images before rendering
 */
const ImageGrid = ({ page, data, formatImage }) => {
  const router = useRouter();
  const totalPages = Math.ceil(data.total / pageSize);
  // pageNum from query is always available, including on initial render
  const pageNum = parseInt(router.query.page) || 1;
  // Initialize displayCount to pageSize for hydration consistency
  // On page 2, we'll scroll/hydrate and show the correct slice
  const [displayCount, setDisplayCount] = useState(pageSize);

  const images = data.images || [];

  useEffect(() => {
    const handleScrollHandler = () => {
      const lastRecordLoaded = document.querySelector(
        'div > div:last-child > div:last-child'
      );
      if (lastRecordLoaded) {
        const lastRecordLoadedOffset =
          lastRecordLoaded.offsetTop + lastRecordLoaded.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastRecordLoadedOffset) {
          if (displayCount < data.total) {
            const newDisplayCount = displayCount + pageSize;
            setDisplayCount(
              newDisplayCount > data.total ? data.total : newDisplayCount
            );
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollHandler);
    return () => {
      window.removeEventListener('scroll', handleScrollHandler);
    };
  }, [displayCount, data]);

  // startIndex is determined by the current page number
  const startIndex = pageNum > 1 ? (pageNum - 1) * pageSize : 0;
  // Show images from startIndex, up to displayCount items
  const endIndex = Math.min(startIndex + displayCount, images.length);
  const displayImages = images.slice(startIndex, endIndex);

  // Apply optional formatting to images
  const formattedImages = formatImage
    ? displayImages.map(formatImage)
    : displayImages;

  return (
    <Layout>
      <Head pageTitle={page.title} />
      <Box>
        <ContentDetails>
          <Title as="h1" size="large">
            {page.title}
          </Title>
        </ContentDetails>
        {formattedImages.length > 0 && (
          <Gallery photos={formattedImages} targetRowHeight={250} />
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

ImageGrid.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  formatImage: PropTypes.func,
};

export default ImageGrid;
