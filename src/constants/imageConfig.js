export const sizes = {
  article: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 778px',
  recommendations: '(max-width: 768px) 100vw, (max-width: 1024px) 30vw, (max-width: 1440px) 25vw, 20vw',
  gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw',
  selfie: '100px',
};

export const componentSizes = {
  article: {
    maxWidth: 1000,
    maxHeight: 563,
  },
  recommendations: {
    maxWidth: 500,
  },
  gallery: {
    maxWidth: 1200,
  },
  selfie: {
    maxWidth: 150,
  },
};

export const defaultSizes = sizes.article;
export const imageQuality = 75;
export const imageFormat = 'webp';
