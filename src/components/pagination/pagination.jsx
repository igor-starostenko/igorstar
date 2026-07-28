import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row } from './pagination.css.js';

const Pagination = ({ pageNum, totalPages, basePath }) => (
  <Row>
    {pageNum > 1 ? (
      <Link href={`/${basePath}/${pageNum - 1}`}>{'<< Previous Page'}</Link>
    ) : (
      <div />
    )}
    {pageNum < totalPages ? (
      <Link href={`/${basePath}/${pageNum + 1}`}>{'Next Page >>'}</Link>
    ) : (
      <div />
    )}
  </Row>
);

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  basePath: PropTypes.string,
};

Pagination.defaultProps = {
  basePath: 'feed',
};

export default Pagination;
