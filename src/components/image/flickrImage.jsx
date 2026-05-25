import PropTypes from 'prop-types';
import Link from 'next/link';
import { parseStringSync } from 'xml2js';
import BaseImage from './baseImage.jsx';
import FlickrIcon from 'components/icons/flickrIcon.jsx';
import {
  ImageContainer,
  ImageFrame,
  ImageHeader,
  ImageFooter,
  ImageTitle,
  ImageCopyright,
} from './image.css.js';

const FlickrImage = ({ xml, isRaw = false }) => {
  let href, title, src, width, height;

  try {
    const result = parseStringSync(
      xml,
      { ignoreAttrs: false, mergeAttrs: true, explicitArray: false }
    );
    
    if (!result?.a) {
      return <span />;
    }
    
    const { a } = result;
    href = a.href;
    title = a.title;
    if (a.img) {
      src = a.img.src;
      width = a.img.width;
      height = a.img.height;
    }
  } catch {
    return <span />;
  }

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
