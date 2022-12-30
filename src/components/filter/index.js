import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/title';
import { TitleHeader, Counter } from './filter.css';

const Filter = ({ title, displayCount, totalCount }) => (
  <TitleHeader>
    <Title as="h1" size="large">
      {title}
    </Title>
    <Counter>
      Loaded {displayCount} of {totalCount} posts
    </Counter>
  </TitleHeader>
);

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  displayCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Filter;
