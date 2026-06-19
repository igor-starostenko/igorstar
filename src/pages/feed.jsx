import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';

const formatCaption = ({ description, locationText, date }) => {
  const day = date ? new Date(date).toDateString() : null;
  const locationPrefix = description && locationText ? ' - ' : '';
  const dayPrefix = (description || locationText) && day ? ', ' : '';
  return `${description}${locationPrefix}${locationText}${dayPrefix}${day}`;
};

const FeedPage = ({ page, feed }) => (
  <Layout>
    <Head pageTitle={page.title} />
    <Box>
      <Title as="h1" size="large">
        {page.title}
      </Title>
      <div style={{ margin: '0 -4rem' }}>
        {feed.images.length > 0 && (
          <Gallery photos={feed.images} targetRowHeight={250} />
        )}
      </div>
    </Box>
  </Layout>
);

FeedPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  feed: PropTypes.shape({
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
    order: '-fields.date',
    limit: 1000,
  });

  // Pre-generate blurDataURLs for feed images during data fetching
  const { makeBlurDataURL } = await import('helpers/contentful');

  const imagesWithBlurData = items
    ? await Promise.all(
        items.map(
          async ({ image, description, locationText, date, ...fields }) => {
            const parsedImage = parseItem(image);

            // Generate blurDataURL if image exists and is from Contentful
            let blurDataURL = undefined;
            if (parsedImage?.src) {
              blurDataURL = await makeBlurDataURL(parsedImage.src);
            }

            // Only include blurDataURL if it has a valid value (Next.js requires serializable JSON)
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
