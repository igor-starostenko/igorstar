import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row } from './pagination.css';

const Pagination = ({ pageNum, totalPages }) => (
  <Row>
    {pageNum > 1 ? (
      <Link href={{ query: { page: pageNum - 1 } }}>{'<< Previous Page'}</Link>
    ) : (
      <div />
    )}
    {pageNum < totalPages ? (
      <Link href={{ query: { page: pageNum + 1 } }}>{'Next Page >>'}</Link>
    ) : (
      <div />
    )}
  </Row>
);

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
