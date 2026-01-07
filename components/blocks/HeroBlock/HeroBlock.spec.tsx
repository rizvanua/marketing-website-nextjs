/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import HeroBlock from './index';
import { CmsBlock } from '@/lib/mockCms';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock TrackedButton
jest.mock('../TrackedButton', () => ({
  __esModule: true,
  default: ({ href, text }: { href: string; text: string }) => (
    <a href={href}>{text}</a>
  ),
}));

// Mock tracking
jest.mock('@/lib/tracking', () => ({
  trackCtaClick: jest.fn(),
}));

const mockHeroBlock: Extract<CmsBlock, { type: 'hero' }> = {
  type: 'hero',
  heading: 'Manage more properties. With less work.',
  subheading: 'Guesty helps property managers automate workflows and scale operations.',
  ctaText: 'Request a demo',
  ctaHref: '/contact',
};

const mockHeroBlockWithBanner: Extract<CmsBlock, { type: 'hero' }> = {
  ...mockHeroBlock,
  bannerImage: '/assets/hero-banner.webp',
};

describe('HeroBlock', () => {
  it('renders heading', () => {
    render(<HeroBlock block={mockHeroBlock} />);
    expect(screen.getByText('Manage more properties. With less work.')).toBeInTheDocument();
  });

  it('renders subheading', () => {
    render(<HeroBlock block={mockHeroBlock} />);
    expect(
      screen.getByText('Guesty helps property managers automate workflows and scale operations.')
    ).toBeInTheDocument();
  });

  it('renders CTA button with correct text and href', () => {
    render(<HeroBlock block={mockHeroBlock} />);
    const ctaButton = screen.getByText('Request a demo');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('renders banner image when provided', () => {
    render(<HeroBlock block={mockHeroBlockWithBanner} />);
    const bannerImage = screen.getByAltText('');
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', expect.stringContaining('hero-banner.webp'));
  });

  it('does not render banner image when not provided', () => {
    const { container } = render(<HeroBlock block={mockHeroBlock} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(0);
  });

  it('renders as a section element', () => {
    const { container } = render(<HeroBlock block={mockHeroBlock} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});

