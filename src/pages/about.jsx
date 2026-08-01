import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from 'components/layout/layout.jsx';
import { ContentDetails } from 'components/layout/layout.css.js';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Selfie from 'components/selfie/selfie.jsx';

const About = ({ title, content }) => (
  <Layout>
    <Head pageTitle={title} />
    <ContentDetails>
      <Box>
        <Selfie src="/selfie.webp" />
        {documentToReactComponents(content)}
      </Box>
    </ContentDetails>
  </Layout>
);

About.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

export default About;

export const getStaticProps = async () => {
  const { getEntries } = await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'About',
  });
  const { title, content } = pages.items[0];

  return {
    props: {
      title,
      content,
    },
  };
};
