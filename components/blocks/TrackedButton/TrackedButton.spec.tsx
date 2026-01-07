import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackedButton from './index';
import * as tracking from '@/lib/tracking';

// Mock the tracking module
jest.mock('@/lib/tracking', () => ({
  trackCtaClick: jest.fn(),
}));

describe('TrackedButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with text', () => {
    render(<TrackedButton href="/test" text="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders button as link', () => {
    render(<TrackedButton href="/test" text="Click Me" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('tracks click event', async () => {
    const user = userEvent.setup();
    render(<TrackedButton href="/test" text="Click Me" />);
    
    const button = screen.getByText('Click Me');
    await user.click(button);

    expect(tracking.trackCtaClick).toHaveBeenCalledWith(
      'Click Me',
      '/test',
      expect.any(URLSearchParams)
    );
  });

  it('applies custom variant and color', () => {
    render(
      <TrackedButton
        href="/test"
        text="Click Me"
        variant="outlined"
        color="secondary"
      />
    );
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });
});

