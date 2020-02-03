import { createGlobalStyle } from 'styled-components';
import { colors } from 'constants/theme';

export default createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    line-height: 1;
    font-size: 1.6rem;
    color: #000;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-font-feature-settings: "pnum";
    font-feature-settings: "pnum";
    font-variant-numeric: proportional-nums;
  }

  #___gatsby {
    height: 100%;

    > div {
       height: 100%; 
    }
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: ${colors.accent};
  }

  pre {
    display: block;
    padding: 2rem;
    margin-top: 4rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    border-radius: 5px;
    color: ${colors.accent};
    border: 1px solid #ddd;
    font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  }

  .youtube-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }
  
  .youtube-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  video {
    max-width: 100%;
  }

  p {
    margin-bottom: 2rem;
  }
`;
