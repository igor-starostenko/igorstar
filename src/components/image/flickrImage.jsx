import PropTypes from 'prop-types';
import { useMemo } from 'react';
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

// Parse Flickr XML on server (using simple string parsing)
const parseFlickrXml = (xml) => {
  try {
    // Try DOMParser first (client)
    if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/html');
      const link = doc.querySelector('a');

      if (link) {
        const href = link.href;
        const title =
          link.title || doc.querySelector('img')?.alt || 'Flickr image';
        const img = doc.querySelector('img');
        
        if (href && title) {
          let src, width, height;
          if (img) {
            src = img.src;
            width = parseInt(img.width) || 424; // flickr default
            height = parseInt(img.height) || 640; // flickr default
          }
          
          if (src) {
            return { href, title, src, width, height };
          }
        }
      }
    } else {
      // Server-side: use simple string parsing
      // Extract href from <a data-flickr-embed="true" ... href="...">
      const hrefMatch = xml.match(/href=["']([^"']+)["']/);
      const titleMatch = xml.match(/alt=["']([^"']+)["']/) || 
                        xml.match(/title=["']([^"']+)["']/);
      const imgMatch = xml.match(/src=["']([^"']+\.jpe?g)["']/) ||
                      xml.match(/src=["']([^"']+\.png)["']/);
      
      if (hrefMatch && titleMatch) {
        return {
          href: hrefMatch[1],
          title: titleMatch[1],
          src: imgMatch ? imgMatch[1] : '',
          width: 424,
          height: 640,
        };
      }
    }
  } catch {
    // Fall through to null
  }
  return null;
};

const FlickrImage = ({ xml, isRaw = false, backupSrc }) => {
  // Compute parsed data on both server and client
  const data = useMemo(() => parseFlickrXml(xml), [xml]);
  const error = !data;

  if (isRaw === true) {
    return <span dangerouslySetInnerHTML={{ __html: xml }} />;
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
