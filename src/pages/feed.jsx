import PaginatedGallery from 'components/paginatedGallery/paginatedGallery.jsx';
import PropTypes from 'prop-types';

const FeedPage = ({ page, feed }) => {
  // Parse images from Contentful response
  const data = {
    limit: feed.limit,
    skip: feed.skip,
    total: feed.total,
    images: feed.images.map((img) => ({
      caption: img.caption || '',
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
  const { addBlurDataURLs } = await import('helpers/contentful');

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

  // Parse images and add blurDataURLs if not already set
  const parsedImages = validItems.map(({ image, ...fields }) => ({
    ...parseItem(image),
    ...fields,
  }));

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

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
