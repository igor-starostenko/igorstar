import PaginatedGallery from 'components/paginatedGallery/index.jsx';
import PropTypes from 'prop-types';

const GalleryPage = ({ page, gallery }) => {
  // Parse images from Contentful response
  const data = {
    limit: gallery.limit,
    skip: gallery.skip,
    total: gallery.total,
    images: gallery.images.map((img) => ({
      caption: img.caption || '',
      src: img.src,
      alt: img.alt || '',
      blurDataURL: img.blurDataURL || undefined,
    })),
  };

  return <PaginatedGallery title={page.title} data={data} />;
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
