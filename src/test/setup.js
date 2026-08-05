import '@testing-library/jest-dom';

// Mock IntersectionObserver for testing components that use it
global.IntersectionObserver = vi.fn(function IntersectionObserver() {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

// Add DOM assertions
expect.extend({
  toBeInTheDocument(received) {
    const pass =
      received != null && received.ownerDocument.body.contains(received);
    return {
      message: () =>
        pass
          ? `expected element not to be in document`
          : `expected element to be in document\n received: ${received ? received.constructor.name : received}`,
      pass,
    };
  },
});
