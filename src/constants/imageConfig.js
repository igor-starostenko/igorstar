export const componentSizes = {
  article: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 778px',
    maxWidth: 1000,
    maxHeight: 563,
  },
  recommendations: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 30vw, (max-width: 1440px) 25vw, 20vw',
    maxWidth: 500,
  },
  gallery: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw',
    maxWidth: 1200,
    maxHeight: 800,
  },
  selfie: {
    sizes: '100px',
    maxWidth: 150,
  },
};

export const defaultSizes = componentSizes.article.sizes;
export const imageQuality = 75;
export const imageFormat = 'webp';
