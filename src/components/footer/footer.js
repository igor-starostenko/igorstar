import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container, Social, Copyright } from './footer.css';
import {
  FivehundredpxIcon,
  FlickrIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../icons';

const SocialLink = ({ children, href, ...rest }) => (
  <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
    {children}
  </a>
);

SocialLink.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
};

const Footer = ({ author, social }) => (
  <Container>
    <Social>
      <SocialLink
        href={`https://github.com/${social.github}`}
        arialabel="Twitter"
      >
        <GithubIcon width="19" />
      </SocialLink>
      <SocialLink
        href={`https://linkedin.com/in/${social.linkedin}`}
        arialabel="LinkedIn"
      >
        <LinkedinIcon width="19" />
      </SocialLink>
      <SocialLink
        href={`https://twitter.com/${social.twitter}`}
        arialabel="Twitter"
      >
        <TwitterIcon width="19" />
      </SocialLink>
      <SocialLink
        href={`https://youtube.com/channel/${social.youtube}/videos`}
        arialabel="YouTube"
      >
        <YoutubeIcon width="19" />
      </SocialLink>
      <SocialLink
        href={`https://instagram.com/${social.instagram}`}
        arialabel="Instagram"
      >
        <InstagramIcon width="19" />
      </SocialLink>
      <SocialLink
        href={`https://flickr.com/photos/${social.flickr}`}
        arialabel="Flickr"
      >
        <FlickrIcon width="19" />
      </SocialLink>
      <SocialLink
        href={`https://500px.com/${social.fivehundredpx}`}
        arialabel="500px"
      >
        <FivehundredpxIcon width="19" />
      </SocialLink>
    </Social>
    <Copyright>
      <Link to="/">{author}</Link> © {new Date().getFullYear()}
    </Copyright>
  </Container>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  social: PropTypes.shape({
    github: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired,
    flickr: PropTypes.string.isRequired,
    fivehundredpx: PropTypes.string.isRequired,
  }).isRequired,
};

export default Footer;
