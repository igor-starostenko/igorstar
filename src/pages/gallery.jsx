import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';

const GalleryPage = ({ page, gallery }) => (
  <Layout>
    <Head pageTitle={page.title} />
    <Box>
      <Title as="h1" size="large">
        {page.title}
      </Title>
      <div style={{ margin: '0 -4rem' }}>
        {gallery.images.length > 0 && (
          <Gallery photos={gallery.images} targetRowHeight={250} />
        )}
      </div>
    </Box>
  </Layout>
);

GalleryPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  gallery: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default GalleryPage;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });

  const { items, ...gallery } = await getAllEntries({
    content_type: 'gallery',
  });

  // Pre-generate blurDataURLs for gallery images during data fetching
  const { makeBlurDataURL } = await import('helpers/contentful');

  const imagesWithBlurData = items
    ? await Promise.all(
        items.map(async ({ image, ...fields }) => {
          const parsedImage = parseItem(image);

          // Generate blurDataURL if image exists and is from Contentful
          let blurDataURL = undefined;
          if (parsedImage?.src) {
            blurDataURL = await makeBlurDataURL(parsedImage.src);
          }

          // Only include blurDataURL if it has a valid value (Next.js requires serializable JSON)
          const imageWithBlur = { ...parsedImage, ...fields };
          if (blurDataURL) {
            imageWithBlur.blurDataURL = blurDataURL;
          }

          return imageWithBlur;
        })
      )
    : [];

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
