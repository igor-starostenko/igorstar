import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';

const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const pageSize = 10;

const GalleryPage = ({ page, gallery }) => {
  const router = useRouter();
  const totalPages = Math.ceil((gallery.images?.length || 0) / pageSize);
  const pageNum = parseInt(router.query.page) || 1;
  const [displayCount, setDisplayCount] = useState(
    pageNum ? pageNum * pageSize : pageSize
  );

  const images = gallery.images || [];

  // Only update displayCount on scroll if we haven't reached the end
  const handleScroll = useCallback(() => {
    if (displayCount >= gallery.total) return;

    const lastRecordLoaded = document.querySelector(
      'div > div:last-child > div:last-child'
    );
    if (lastRecordLoaded) {
      const lastRecordLoadedOffset =
        lastRecordLoaded.offsetTop + lastRecordLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastRecordLoadedOffset) {
        const newDisplayCount = Math.min(
          displayCount + pageSize,
          gallery.total
        );
        setDisplayCount(newDisplayCount);
      }
    }
  }, [displayCount, gallery.total]);

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
      <Head pageTitle={page.title} />
      <Box>
        <div
          style={{
            margin: '0 -4rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {displayImages.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {displayImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: '32%',
                    margin: '1%',
                    boxSizing: 'border-box',
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || ''}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {pageNum < totalPages ? (
          <Pagination pageNum={pageNum} totalPages={totalPages} />
        ) : (
          ''
        )}
      </Box>
    </Layout>
  );
};

GalleryPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  gallery: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export const getStaticProps = async () => {
  const { getAllEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getAllEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });

  const { items, ...gallery } = await getAllEntries({
    content_type: 'gallery',
  });

  // Parse images and add blurDataURLs if not already set
  const parsedImages = items
    ? items.map(({ image, ...fields }) => ({
        ...parseItem(image),
        ...fields,
      }))
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      page: pages.items[0] || {},
      gallery: {
        ...gallery,
        images: imagesWithBlurData,
      },
    },
  };
};

export default GalleryPage;
