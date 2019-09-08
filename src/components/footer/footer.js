import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container, Navigation, Social, Copyright } from './footer.css';
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
      <SocialLink href={`https://github.com/${social.github}`}>
        <GithubIcon />
      </SocialLink>
      <SocialLink href={`https://www.linkedin.com/in/${social.linkedin}`}>
        <LinkedinIcon />
      </SocialLink>
      <SocialLink href={`https://twitter.com/${social.twitter}`}>
        <TwitterIcon />
      </SocialLink>
      <SocialLink
        href={`https://www.youtube.com/channel/${social.youtube}/videos`}
      >
        <YoutubeIcon />
      </SocialLink>
      <SocialLink href={`https://www.instagram.com/${social.instagram}`}>
        <InstagramIcon />
      </SocialLink>
      <SocialLink href={`https://www.flickr.com/photos/${social.flickr}`}>
        <FlickrIcon />
      </SocialLink>
      <SocialLink href={`https://500px.com/${social.fivehundredpx}`}>
        <FivehundredpxIcon />
      </SocialLink>
    </Social>
    <Navigation />
    <Copyright>
      <Link to="/">{author}</Link> © 2019
    </Copyright>
  </Container>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  social: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired,
    flickr: PropTypes.string.isRequired,
    fivehundredpx: PropTypes.string.isRequired,
  }).isRequired,
};

export default Footer;
