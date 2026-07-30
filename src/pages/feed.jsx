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

const formatCaption = ({ description, locationText, date }) => {
  const day = date ? new Date(date).toDateString() : null;
  const locationPrefix = description && locationText ? ' - ' : '';
  const dayPrefix = (description || locationText) && day ? ', ' : '';
  return `${description}${locationPrefix}${locationText}${dayPrefix}${day}`;
};

const FeedPage = ({ page, feed }) => {
  const router = useRouter();
  const totalPages = Math.ceil((feed.images?.length || 0) / pageSize);
  const pageNum = parseInt(router.query.page) || 1;
  const [displayCount, setDisplayCount] = useState(
    pageNum ? pageNum * pageSize : pageSize
  );

  const images = feed.images || [];

  // Only update displayCount on scroll if we haven't reached the end
  const handleScroll = useCallback(() => {
    if (displayCount >= feed.total) return;

    const lastRecordLoaded = document.querySelector(
      'div > div:last-child > div:last-child'
    );
    if (lastRecordLoaded) {
      const lastRecordLoadedOffset =
        lastRecordLoaded.offsetTop + lastRecordLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastRecordLoadedOffset) {
        const newDisplayCount = Math.min(displayCount + pageSize, feed.total);
        setDisplayCount(newDisplayCount);
      }
    }
  }, [displayCount, feed.total]);

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

FeedPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  feed: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });

  const { items, ...feed } = await getAllEntries({
    content_type: 'feed',
    limit: 1000,
  });

  // Filter out items without valid image src to prevent Next.js warnings
  const validItems = items.filter((item) => item?.image?.fields?.file?.url);

  // Pre-generate blurDataURLs for feed images during data fetching
  const { makeBlurDataURL } = await import('helpers/contentful');

  const imagesWithBlurData = validItems.length
    ? await Promise.all(
        validItems.map(
          async ({ image, description, locationText, date, ...fields }) => {
            const parsedImage = parseItem(image);

            // Generate blurDataURL if image exists and is from Contentful
            let blurDataURL = null;
            if (parsedImage?.src) {
              const result = await makeBlurDataURL(parsedImage.src);
              blurDataURL = result ?? null;
            }

            // Only include blurDataURL if it has a valid value
            const imageWithBlur = {
              caption: formatCaption({ description, locationText, date }),
              ...fields,
              ...parsedImage,
            };
            if (blurDataURL) {
              imageWithBlur.blurDataURL = blurDataURL;
            }

            return imageWithBlur;
          }
        )
      )
    : [];

  return {
    props: {
      page: pages.items[0] || {},
      feed: {
        ...feed,
        images: imagesWithBlurData,
      },
    },
  };
};

export default FeedPage;
