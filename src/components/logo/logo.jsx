import BaseImage from 'components/image/baseImage';

const LogoSvg = (props) => (
  <BaseImage
    width={105}
    height={22}
    src="/logo.svg"
    query=""
    alt="logo"
    priority
    {...props}
  />
);

export default LogoSvg;
