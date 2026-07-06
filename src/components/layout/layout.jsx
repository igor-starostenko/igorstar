import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Header from 'components/header/header.jsx';
import Footer from 'components/footer/footer.jsx';
import { timeout } from 'constants/transition.js';
import config from '../../../site-config.cjs';
import { Container, Content } from './layout.css.js';

const Layout = ({ config, children }) => {
  const { siteTitleShort, author, social } = config;

  return (
    <Container>
      <motion.div
        key="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: timeout }}
      >
        <Header title={siteTitleShort} />
      </motion.div>

      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: timeout }}
      >
        <Content>{children}</Content>
      </motion.div>

      <Footer author={author} social={social} />
    </Container>
  );
};

Layout.propTypes = {
  config: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const LayoutWithConfig = (props) => <Layout config={config} {...props} />;

LayoutWithConfig.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWithConfig;
