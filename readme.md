# igorstar.com

<p>
  <a href="https://github.com/prettier/prettier">
    <img
      src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg"
      alt="styled with prettier"
    />
  </a>
</p>

<p>
  <strong>
    You can access it online at <a href="https://igorstar.com">www.igorstar.com</a>.
  </strong>
</p>

<p>
  Personal blog. Feel free to use it as a template.
</p>

***

## Features

: [X] 🌿 Static site based on NextJS
- [X] 🎞  [Contentful CMS](https://contentful.github.io/) integrated
- [X] 🤩 Page Transitions
- [X] 💅 [`styled-components`](https://www.styled-components.com/)
- [X] 💯 Optimized with [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) (including test)
- [X] 🔥 Code Splitting of CSS and JS (component based)
- [X] 🔪 Inline SVG support
- [X] ⚙️  One config file for site-wide settings
- [X] 💙 Most social + meta tags in one component
- [X] 🖼  All favicons generated,only one icon file needed
- [X] 🌐 Offline support
- [X] 📄 Manifest support
- [X] 🗺 Sitemap support
- [X] 😎 [Prettier](https://prettier.io/) for code style
- [X] 👨‍🏫 ESLint (based on [`eslint-plugin-react`](./.eslintrc))
- [X] 🌅 Responsive gallery with [`react-photo-gallery`](https://www.npmjs.com/package/react-photo-gallery)

Do you have suggestions or feedback? [Open an issue](https://github.com/igor-starostenko/igorstar/issues)!

## Lighthouse scores

<img src="./public/lighthouse_score.png" alt="Lighthouse Score"/>

## Usage

```bash
# Clone repo
git clone https://github.com/igor-starostenko/igorstar.git
cd igorstar
yarn install

# To develop
yarn develop

# To build
yarn build

# To test SSR (for Lighthouse etc.)
yarn ssr

# To format JS (precommit)
yarn format

# To generate favicons (included in `build`)
yarn build:favicons
```

## Author

* Igor Starostenko ([@IgorStarostenko](https://twitter.com/IgorStarostenko))
