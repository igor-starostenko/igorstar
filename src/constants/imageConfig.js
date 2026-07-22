export const componentSizes = {
  article: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 778px',
    maxWidth: 2334,
    maxHeight: 1312,
  },
  recommendations: {
    sizes:
      '(max-width: 768px) 100vw, (max-width: 1024px) 30vw, (max-width: 1440px) 25vw, 200px',
    maxWidth: 600,
    maxHeight: 400,
  },
  gallery: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px',
    maxWidth: 2334,
    maxHeight: 1312,
  },
  selfie: {
    sizes: '100px',
    maxWidth: 200,
    maxHeight: 200,
  },
};

export const defaultSizes = componentSizes.article.sizes;
export const imageQuality = 30;
export const imageFormat = 'webp';
