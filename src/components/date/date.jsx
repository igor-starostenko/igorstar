import PropTypes from 'prop-types';
import { DateBase, DateMain, DateMobile } from './date.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const DateText = ({ date, isMobile, ...rest }) => {
  const { isMobile: _isMobile, ...domRest } = rest;
  if (isMobile === false) {
    return <DateMain {...domRest}>— {formatDate(date)}</DateMain>;
  }

  if (isMobile === true) {
    return <DateMobile {...domRest}>— {formatDate(date)}</DateMobile>;
  }

  return <DateBase {...domRest}>{formatDate(date)}</DateBase>;
};

DateText.propTypes = {
  date: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
};

export default DateText;
