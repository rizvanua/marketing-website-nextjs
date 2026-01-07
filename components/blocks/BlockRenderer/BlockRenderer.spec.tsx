import { render, screen } from '@testing-library/react';
import BlockRenderer from './index';
import { CmsBlock } from '@/lib/mockCms';

// Mock the block components
jest.mock('../HeroBlock', () => {
  return function MockHeroBlock({ block }: { block: CmsBlock }) {
    return <div data-testid="hero-block">{(block as any).heading}</div>;
  };
});

jest.mock('../FeatureGridBlock', () => {
  return function MockFeatureGridBlock({ block }: { block: CmsBlock }) {
    return <div data-testid="feature-grid-block">{(block as any).title}</div>;
  };
});

jest.mock('../TestimonialBlock', () => {
  return function MockTestimonialBlock({ block }: { block: CmsBlock }) {
    return <div data-testid="testimonial-block">{(block as any).quote}</div>;
  };
});

jest.mock('../CtaBannerBlock', () => {
  return function MockCtaBannerBlock({ block }: { block: CmsBlock }) {
    return <div data-testid="cta-banner-block">{(block as any).text}</div>;
  };
});

describe('BlockRenderer', () => {
  it('renders hero block', () => {
    const blocks: CmsBlock[] = [
      {
        type: 'hero',
        heading: 'Test Heading',
        subheading: 'Test Subheading',
        ctaText: 'Click Me',
        ctaHref: '/test',
      },
    ];

    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByTestId('hero-block')).toBeInTheDocument();
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders feature grid block', () => {
    const blocks: CmsBlock[] = [
      {
        type: 'featureGrid',
        title: 'Features',
        items: [
          { title: 'Feature 1', description: 'Description 1' },
        ],
      },
    ];

    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByTestId('feature-grid-block')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
  });

  it('renders testimonial block', () => {
    const blocks: CmsBlock[] = [
      {
        type: 'testimonial',
        quote: 'Great product!',
        author: 'John Doe',
        role: 'CEO',
      },
    ];

    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByTestId('testimonial-block')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
  });

  it('renders CTA banner block', () => {
    const blocks: CmsBlock[] = [
      {
        type: 'ctaBanner',
        text: 'Get Started',
        ctaText: 'Sign Up',
        ctaHref: '/signup',
      },
    ];

    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByTestId('cta-banner-block')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders multiple blocks', () => {
    const blocks: CmsBlock[] = [
      {
        type: 'hero',
        heading: 'Hero',
        subheading: 'Sub',
        ctaText: 'CTA',
        ctaHref: '/',
      },
      {
        type: 'featureGrid',
        title: 'Features',
        items: [],
      },
    ];

    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByTestId('hero-block')).toBeInTheDocument();
    expect(screen.getByTestId('feature-grid-block')).toBeInTheDocument();
  });

  it('handles unknown block types gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const blocks = [
      {
        type: 'unknown',
        data: 'test',
      } as any,
    ];

    render(<BlockRenderer blocks={blocks} />);
    expect(screen.queryByTestId('hero-block')).not.toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});

