import PropTypes from 'prop-types';
import { DateBase, DateMain, DateMobile } from './date.css';
import { formatDate } from 'helpers/date';

const DateText = ({ date, isMobile, ...rest }) => {
  const domRest = rest;
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
