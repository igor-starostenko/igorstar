import BaseImage from 'components/image/baseImage';
import { ImageWrapper } from 'components/image/image.css';

const LogoSvg = (props) => (
  <ImageWrapper className="logo-image-wrapper">
    <BaseImage
      width={105}
      height={22}
      src="/logo.svg"
      query=""
      alt="logo"
      {...props}
    />
  </ImageWrapper>
);

export default LogoSvg;
