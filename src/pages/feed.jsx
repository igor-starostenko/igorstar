import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';
import { ContentDetails } from 'components/layout/layout.css.js'

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
      <ContentDetails>
        <Title as="h1" size="large">
          {page.title}
        </Title>
      </ContentDetails>
      {feed.images.length > 0 && (
        <Gallery photos={feed.images} targetRowHeight={250} />
      )}
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
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });

  const { items, ...feed } = await getAllEntries({
    content_type: 'feed',
    order: '-fields.date',
    limit: 1000,
  });

  // Parse images with caption and add blurDataURLs if not already set
  const parsedImages = items
    ? items.map(({ image, description, locationText, date, ...fields }) => ({
        caption: formatCaption({ description, locationText, date }),
        ...fields,
        ...parseItem(image),
      }))
    : [];

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
