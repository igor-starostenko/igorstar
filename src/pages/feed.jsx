import PaginatedGallery from 'components/paginatedGallery/paginatedGallery.jsx';

const FeedPage = (props) => <PaginatedGallery {...props} pageSize={18} targetRowHeight={260} />;

export const getStaticProps = async () => {
  const { getAllEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getAllEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });
  const { title } = pages.items[0];

  const { items, total } = await getAllEntries({
    content_type: 'feed',
    order: '-fields.date',
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

export default FeedPage;
