import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BaseImage from './baseImage.jsx';
import FlickrIcon from 'components/icons/flickrIcon.jsx';
import {
  ImageWrapper,
  ImageFrame,
  ImageHeader,
  ImageFooter,
  ImageTitle,
  ImageCopyright,
} from './image.css.js';

const parseFlickrXml = (xml) => {
  if (typeof window === 'undefined') return null;
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/html');
    const link = doc.querySelector('a');

    if (!link) {
      return null;
    }

    const href = link.href;
    const title = link.title || doc.querySelector('img')?.alt || 'Flickr image';
    const img = doc.querySelector('img');

    if (!href || !title) {
      return null;
    }

    let src, width, height;
    if (img) {
      src = img.src;
      width = parseInt(img.width) || 424; // flickr default
      height = parseInt(img.height) || 640; // flickr default
    }

    if (src) {
      return { href, title, src, width, height };
    }
  } catch (e) {
    // Parsing error
  }

  return null;
};

const FlickrImage = ({ xml, isRaw = false, backupSrc }) => {
  const [parsedData, setParsedData] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const result = parseFlickrXml(xml);
    setParsedData(result);
    if (!result) {
      setHasError(true);
    }
  }, [xml]);

  if (isRaw === true) {
    return <span dangerouslySetInnerHTML={{ __html: xml }} />;
  }

  if (hasError || !parsedData) {
    // Error or loading state
    return <span />;
  }

  const { href, title, src, width, height } = parsedData;

  return (
    <Link href={href} title={title}>
      <ImageWrapper>
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
      </ImageWrapper>
    </Link>
  );
};

FlickrImage.propTypes = {
  xml: PropTypes.string,
  isRaw: PropTypes.bool,
  backupSrc: PropTypes.string,
};

export default FlickrImage;
