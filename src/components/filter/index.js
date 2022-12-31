import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from 'components/title';
import { Container, TitleHeader, Categories, Counter } from './filter.css';

const filters = [
  { title: 'All', href: '/' },
  { title: 'Travel', href: '/travel' },
  { title: 'Tech', href: '/tech' },
];

const Filter = ({ path, title, displayCount, totalCount }) => (
  <Container>
    <TitleHeader>
      <Title as="h1" size="large">
        {title}
      </Title>
      <Categories>
        {filters.map(({ href, title }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontWeight: path === href ? 'bold' : 'inherit',
            }}
          >
            {title}
          </Link>
        ))}
      </Categories>
    </TitleHeader>
    <Counter>
      Loaded {displayCount} of {totalCount} posts
    </Counter>
  </Container>
);

Filter.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Filter;
