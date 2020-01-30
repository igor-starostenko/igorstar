import React from 'react';
import Card from 'components/card';
import { Article } from './article.css.js';

const Container = props => (
  <Article>
    <Card {...props} />
  </Article>
);

export default Container;
