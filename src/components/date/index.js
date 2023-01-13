import PropTypes from 'prop-types';
import { DateMain, DateMobile } from './date.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const DateText = ({ date, isMobile, ...rest }) =>
  isMobile ? (
    <DateMobile {...rest}>— {formatDate(date)}</DateMobile>
  ) : (
    <DateMain {...rest}>— {formatDate(date)}</DateMain>
  );

DateText.propTypes = {
  date: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
};

export default DateText;
