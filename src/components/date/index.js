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
  if (isMobile === false) {
    return <DateMain {...rest}>— {formatDate(date)}</DateMain>;
  }

  if (isMobile === true) {
    return <DateMobile {...rest}>— {formatDate(date)}</DateMobile>;
  }

  return <DateBase {...rest}>{formatDate(date)}</DateBase>;
};

DateText.propTypes = {
  date: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
};

export default DateText;
