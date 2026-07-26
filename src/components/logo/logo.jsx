import { LogoLink } from 'components/header/header.css.js';
import BaseImage from 'components/image/baseImage';

const width = 175;
const height = 21;

const Logo = (props) => (
  <LogoLink href="/">
    <BaseImage
      fill
      src="/logo.svg"
      query=""
      alt="logo"
      priority
      {...props}
    />
  </LogoLink>
);
export default Logo;
