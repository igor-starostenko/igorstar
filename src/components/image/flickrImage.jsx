import PropTypes from 'prop-types';
import { XMLParser } from 'fast-xml-parser';
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

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  processEntities: false,
});

const FlickrImage = ({ xml, isRaw = false, backupSrc }) => {
  if (isRaw === true) {
    return <span dangerouslySetInnerHTML={{ __html: xml }} />;
  }

  try {
    const { a: data } = parser.parse(xml);

    if (!data) {
      return <span />;
    }
    const {
      href,
      title,
      img: { src, width, height },
    } = data;

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
  } catch {
    return <span />;
  }
};

FlickrImage.propTypes = {
  xml: PropTypes.string,
  isRaw: PropTypes.bool,
  backupSrc: PropTypes.string,
};

export default FlickrImage;
