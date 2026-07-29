import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row } from './pagination.css.js';

const Pagination = ({ pageNum, totalPages, basePath }) => {
  // If basePath is provided, use path-based URLs like /basePath/page/N
  // Otherwise use query params like ?page=N
  const href = basePath
    ? `/${basePath}/${pageNum}`
    : { query: { page: pageNum } };

  return (
    <Row>
      {pageNum > 1 ? (
        <Link href={basePath ? `/${basePath}/${pageNum - 1}` : { query: { page: pageNum - 1 } }}>
          {'<< Previous Page'}
        </Link>
      ) : (
        <div />
      )}
      {pageNum < totalPages ? (
        <Link href={href}>{'Next Page >>'}</Link>
      ) : (
        <div />
      )}
    </Row>
  );
};

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  basePath: PropTypes.string,
};

Pagination.defaultProps = {
  basePath: undefined,
};

export default Pagination;
