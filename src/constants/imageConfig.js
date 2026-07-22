export const componentSizes = {
  article: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 778px',
    maxWidth: 900,
    maxHeight: 507,
  },
  recommendations: {
    sizes:
      '(max-width: 768px) 100vw, (max-width: 1024px) 30vw, (max-width: 1440px) 25vw, 200px',
  },
  gallery: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 776px',
    maxWidth: 1200,
    maxHeight: 800,
  },
  selfie: {
    sizes: '100px',
    maxWidth: 100,
    maxHeight: 100,
  },
};

export const defaultSizes = componentSizes.article.sizes;
export const imageQuality = 20;
export const imageFormat = 'webp';
