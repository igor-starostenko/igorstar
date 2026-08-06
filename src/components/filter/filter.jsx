import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from 'components/title/title.jsx';
import { TitleHeader, Categories, Counter } from './filter.css.js';
import { ContentDetails } from 'components/layout/layout.css.js';

const filters = [
  { title: 'All', href: '/' },
  { title: 'Travel', href: '/travel' },
  { title: 'Tech', href: '/tech' },
];

const Filter = ({ path, title, displayCount, totalCount }) => {
  // Normalize path by removing trailing slash for comparison with filter hrefs
  // (trailingSlash: true makes router.asPath include a trailing slash, e.g., "/travel/")
  const normalizedPath = path.replace(/\/$/, '');

  return (
    <ContentDetails>
      <TitleHeader>
        <Title as="h1" size="large">
          {title}
        </Title>
        <Categories>
          {filters.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              className={normalizedPath === href ? 'active' : ''}
            >
              {title}
            </Link>
          ))}
        </Categories>
      </TitleHeader>
      <Counter>
        Loaded {displayCount} of {totalCount} posts
      </Counter>
    </ContentDetails>
  );
};

Filter.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Filter;
