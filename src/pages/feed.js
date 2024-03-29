import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Gallery from 'components/gallery';
import Head from 'components/head';
import Title from 'components/title';

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
  const { getEntries, getAllEntries, parseItem } = await import(
    'contentClient'
  );

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });
  const { items, ...feed } = await getAllEntries({
    content_type: 'feed',
    order: '-fields.date',
    limit: 1000,
  });

  return {
    props: {
      page: pages.items[0] || {},
      feed: {
        ...feed,
        images: items
          ? items.map(
              ({ image, description, locationText, date, ...fields }) => ({
                caption: formatCaption({ description, locationText, date }),
                ...fields,
                ...parseItem(image),
              })
            )
          : [],
      },
    },
  };
};

export default FeedPage;
