import { render, screen } from '@testing-library/react';
import InfiniteScroll from './InfiniteScroll.jsx';

describe('InfiniteScroll', () => {
  const mockLoadMore = vi.fn();

  beforeEach(() => {
    mockLoadMore.mockClear();
  });

  it('should render children content', () => {
    render(
      <InfiniteScroll hasMore={false} isLoading={false} loadMore={mockLoadMore}>
        <div data-testid="test-child">Child content</div>
      </InfiniteScroll>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should render sentinel when hasMore is true', () => {
    const { container } = render(
      <InfiniteScroll hasMore={true} isLoading={false} loadMore={mockLoadMore}>
        <div>Content</div>
      </InfiniteScroll>
    );

    const sentinel = container.querySelector('div[aria-hidden="true"]');
    expect(sentinel).toBeInTheDocument();
  });

  it('should not call loadMore when hasMore is false', () => {
    render(
      <InfiniteScroll hasMore={false} isLoading={false} loadMore={mockLoadMore}>
        <div>Content</div>
      </InfiniteScroll>
    );

    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it('should not call loadMore when isLoading is true', () => {
    render(
      <InfiniteScroll hasMore={true} isLoading={true} loadMore={mockLoadMore}>
        <div>Content</div>
      </InfiniteScroll>
    );

    expect(mockLoadMore).not.toHaveBeenCalled();
  });
});
