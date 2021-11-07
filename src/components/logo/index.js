import React from 'react';
import BaseImage from 'components/image/image';

const LogoSvg = (props) => (
  <BaseImage width={105} height={22} src="/logo.svg" alt="logo" {...props} />
);

export default LogoSvg;
