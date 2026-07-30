import PaginatedGallery from 'components/paginatedGallery.jsx';
import PropTypes from 'prop-types';

const FeedPage = ({ page, feed }) => {
  const formatCaption = ({ description, locationText, date }) => {
    const day = date ? new Date(date).toDateString() : null;
    const locationPrefix = description && locationText ? ' - ' : '';
    const dayPrefix = (description || locationText) && day ? ', ' : '';
    return `${description}${locationPrefix}${locationText}${dayPrefix}${day}`;
  };

  const data = {
    limit: feed.limit,
    skip: feed.skip,
    total: feed.total,
    images: feed.images.map((img) => ({
      caption: formatCaption({ ...img }),
      src: img.src,
      alt: img.alt || '',
      blurDataURL: img.blurDataURL || undefined,
    })),
  };

  return <PaginatedGallery title={page.title} data={data} />;
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
  const { getAllEntries, parseItem } = await import('contentClient');

  const pages = await getAllEntries({
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
              caption: null,
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
