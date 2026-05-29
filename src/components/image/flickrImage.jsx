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

const FlickrImage = ({ xml, isRaw = false, backupSrc }) => {
  let href, title, src, width, height;
  let error = false;

  try {
    const result = parseStringSync(
      xml,
      { ignoreAttrs: false, mergeAttrs: true, explicitArray: false }
    );
    
    if (!result?.a) {
      error = true;
    } else {
      const { a } = result;
      href = a.href;
      title = a.title;
      if (a.img) {
        src = a.img.src;
        width = a.img.width;
        height = a.img.height;
      }
    }
  } catch {
    error = true;
  }

  if (!href || !title || !src || !width || !height) {
    error = true;
  }

  if (error) {
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
          backupSrc={backupSrc}
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
  backupSrc: PropTypes.string,
};

export default FlickrImage;
