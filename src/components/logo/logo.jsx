import { LogoLink } from 'components/header/header.css.js';
import BaseImage from 'components/image/baseImage';

const width = 175;
const height = 21;

const Logo = (props) => (
  <LogoLink href="/" $fixedHeight={height}>
    <BaseImage
      width={width}
      height={height}
      src="/logo.svg"
      query=""
      alt="logo"
      priority
      style={{ objectFit: 'contain' }}
      {...props}
    />
  </LogoLink>
);
export default Logo;
