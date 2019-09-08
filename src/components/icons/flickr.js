import React from 'react';
import PropTypes from 'prop-types';

const FlickrIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0v24h24v-24h-24zm15.333 17c-1.308 0-2.488-.539-3.335-1.405-.846.866-2.024 1.405-3.331 1.405-2.578 0-4.667-2.089-4.667-4.667s2.089-4.667 4.667-4.667c1.307 0 2.485.539 3.332 1.405.847-.866 2.027-1.405 3.335-1.405 2.577 0 4.667 2.089 4.667 4.667s-2.09 4.667-4.668 4.667zm3.334-4.667c0 1.838-1.495 3.333-3.333 3.333s-3.334-1.495-3.334-3.333 1.496-3.333 3.333-3.333 3.334 1.496 3.334 3.333z" />
  </svg>
);

FlickrIcon.propTypes = {
  isDark: PropTypes.bool,
};

export default FlickrIcon;
