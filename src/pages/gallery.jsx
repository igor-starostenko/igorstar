import PaginatedGallery from 'components/paginatedGallery/paginatedGallery.jsx';
import PropTypes from 'prop-types';

const GalleryPage = (props) => <PaginatedGallery {...props} pageSize={10} targetRowHeight={300} />;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });
  const { title } = pages.items[0];

  const { items, total } = await getAllEntries({
    content_type: 'gallery',
  });

  const parsedImages = items
    ? items.map((item) => parseItem(item.image))
    : [];
  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      title,
      total,
      images: imagesWithBlurData,
    },
  };
};

export default GalleryPage;
