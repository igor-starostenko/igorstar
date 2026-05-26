import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container, Social, Copyright } from './footer.css.js';
import {
  FivehundredpxIcon,
  FlickrIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../icons/index.jsx';

const SocialLink = ({ children, href, ...rest }) => (
  <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
    {children}
  </a>
);

SocialLink.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
};

const Footer = ({ author = '', social = {} }) => (
  <Container>
    <Social>
      {social.github && (
        <SocialLink
          href={`https://github.com/${social.github}`}
          {...{ 'aria-label': 'GitHub' }}
        >
          <GithubIcon width="19" />
        </SocialLink>
      )}
      {social.linkedin && (
        <SocialLink
          href={`https://linkedin.com/in/${social.linkedin}`}
          {...{ 'aria-label': 'LinkedIn' }}
        >
          <LinkedinIcon width="19" />
        </SocialLink>
      )}
      {social.twitter && (
        <SocialLink
          href={`https://twitter.com/${social.twitter}`}
          {...{ 'aria-label': 'Twitter' }}
        >
          <TwitterIcon width="19" />
        </SocialLink>
      )}
      {social.youtube && (
        <SocialLink
          href={`https://youtube.com/channel/${social.youtube}/videos`}
          {...{ 'aria-label': 'YouTube' }}
        >
          <YoutubeIcon width="19" />
        </SocialLink>
      )}
      {social.flickr && (
        <SocialLink
          href={`https://flickr.com/photos/${social.flickr}`}
          {...{ 'aria-label': 'Flickr' }}
        >
          <FlickrIcon width="19" />
        </SocialLink>
      )}
      {social.fivehundredpx && (
        <SocialLink
          href={`https://500px.com/${social.fivehundredpx}`}
          {...{ 'aria-label': '500px' }}
        >
          <FivehundredpxIcon width="19" />
        </SocialLink>
      )}
    </Social>
    <Copyright>
      <Link href="/">{author}</Link> © {new Date().getFullYear()}
    </Copyright>
  </Container>
);

Footer.propTypes = {
  author: PropTypes.string,
  social: PropTypes.shape({
    github: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string,
    twitter: PropTypes.string,
    youtube: PropTypes.string,
    flickr: PropTypes.string,
    fivehundredpx: PropTypes.string,
  }),
};

export default Footer;
