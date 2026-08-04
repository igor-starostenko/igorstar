export const componentSizes = {
  article: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 778px',
  },
  recommendations: {
    sizes:
      '(max-width: 768px) 100vw, (max-width: 1024px) 30vw, (max-width: 1440px) 25vw, 528px',
  },
  gallery: {
    size: "796px",
    sizes: [
      { viewport: "(max-width: 800px)", size: "calc(100vw - 4px)" },
    ],
    width: 796,
    height: 300,
  },
  selfie: {
    sizes: '100px',
    width: 100,
    height: 100,
  },
};

export const defaultSizes = componentSizes.article.sizes;
export const imageQuality = 40;
export const imageFormat = 'webp';
