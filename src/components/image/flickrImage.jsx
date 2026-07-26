import PropTypes from 'prop-types';
import { XMLParser } from 'fast-xml-parser';
import Link from 'next/link';
import BaseImage from './baseImage.jsx';
import FlickrIcon from 'components/icons/flickrIcon.jsx';
import {
  FlickrContainer,
  ImageContainer,
  ImageFrame,
  ImageHeader,
  ImageFooter,
  ImageTitle,
  ImageCopyright,
} from './image.css.js';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  processEntities: false,
});

const parseFlickrImage = (xml) => {
  try {
    const {
      a: {
        href,
        title,
        img: { src, width, height },
      },
    } = parser.parse(xml);

    const w = Number(width);
    const h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h)) return {};

    return { href, title, src, width: w, height: h };
  } catch {
    return {};
  }
};

const FlickrImage = ({ xml, isRaw = false, backupSrc }) => {
  if (isRaw === true) {
    return <span dangerouslySetInnerHTML={{ __html: xml }} />;
  }

  const { href, title, src, width, height } = parseFlickrImage(xml);
  if (!href || !src) {
    return <span />;
  }

  return (
    <FlickrContainer>
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
    </FlickrContainer>
  );
};

FlickrImage.propTypes = {
  xml: PropTypes.string,
  isRaw: PropTypes.bool,
  backupSrc: PropTypes.string,
};

export default FlickrImage;
