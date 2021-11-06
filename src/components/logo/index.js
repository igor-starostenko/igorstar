import React from 'react';
import Image from 'next/image';

const LogoSvg = (props) => (
  <Image width={105} height={22} src="/logo.svg" alt="logo" {...props} />
);

export default LogoSvg;
