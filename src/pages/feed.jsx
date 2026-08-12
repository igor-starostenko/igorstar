import PaginatedGallery from 'components/paginatedGallery/paginatedGallery.jsx';

const FeedPage = (props) => (
  <PaginatedGallery {...props} pageSize={12} targetRowHeight={260} />
);

export const getStaticProps = async () => {
  const { getAllEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getAllEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });
  const page = pages.items?.[0];
  if (!page) return { notFound: true };
  const { title } = page;

  const { items, total } = await getAllEntries({
    content_type: 'feed',
    order: '-fields.date',
  });

  const parsedImages = items
    ? items.map((item) => {
        const parsed = parseItem(item.image);
        return parsed ? { ...parsed, date: item.date } : parsed;
      })
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
