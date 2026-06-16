import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Only run on client where DOMParser is available
    if (typeof window !== 'undefined') {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/html');
        const link = doc.querySelector('a');

        if (link) {
          const href = link.href;
          const title =
            link.title || doc.querySelector('img')?.alt || 'Flickr image';

          const img = doc.querySelector('img');
          let src, width, height;
          if (img) {
            src = img.src;
            width = parseInt(img.width) || 424; // flickr default
            height = parseInt(img.height) || 640; // flickr default
          }

          if (href && title && src) {
            setData({ href, title, src, width, height });
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    }
  }, [xml]);

  if (isRaw === true) {
    return <span dangerouslySetInnerHTML={{ __html: xml }} />;
  }

  if (!data && !error) {
    // Loading state - return null to avoid hydration mismatch
    return null;
  }

  if (error || !data) {
    // Error state - return empty span
    return <span />;
  }

  const { href, title, src, width, height } = data;

  return (
    <ImageContainer>
      <Link href={href} title={title}>
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
      </Link>
    </ImageContainer>
  );
};

FlickrImage.propTypes = {
  xml: PropTypes.string,
  isRaw: PropTypes.bool,
  backupSrc: PropTypes.string,
};

export default FlickrImage;
