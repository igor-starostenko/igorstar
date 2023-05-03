import PropTypes from 'prop-types';
import Link from 'next/link';
import { parseString } from 'xml2js';
import BaseImage from './image';
import FlickrIcon from 'components/icons/flickr';
import {
  ImageContainer,
  ImageFrame,
  ImageHeader,
  ImageFooter,
  ImageTitle,
  ImageCopyright,
} from './image.css';

const FlickrImage = ({ xml, isRaw = false }) => {
  let href, title, src, width, height;

  parseString(
    xml,
    { ignoreAttrs: false, mergeAttrs: true, explicitArray: false },
    function (err, { a }) {
      if (err) {
        return null;
      }
      href = a.href;
      title = a.title;
      src = a.img.src;
      width = a.img.width;
      height = a.img.height;
    }
  );

  if (!href || !title || !src || !width || !height) {
    return <span />;
  }

  if (isRaw === true) {
    return <span dangerouslySetInnerHTML={{ __html: xml }} />;
  }

  return (
    <Link href={href} title={title}>
      <ImageContainer>
        <BaseImage
          unoptimized
          src={src}
          width={width}
          height={height}
          alt={title}
        />
        <ImageFrame>
          <ImageHeader>
            <FlickrIcon />
          </ImageHeader>
          <ImageFooter>
            <ImageTitle>{title}</ImageTitle>
            <ImageCopyright>All rights reserved</ImageCopyright>
          </ImageFooter>
        </ImageFrame>
      </ImageContainer>
    </Link>
  );
};

FlickrImage.propTypes = {
  xml: PropTypes.string,
  isRaw: PropTypes.bool,
};

export default FlickrImage;
