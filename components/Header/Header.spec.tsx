/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import Header from './index';
import { CmsSiteData } from '@/lib/mockCms';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockSiteData: CmsSiteData['site'] = {
  name: 'Guesty',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Contact', href: '/contact' },
  ],
};

describe('Header', () => {
  it('renders logo image', () => {
    render(<Header siteData={mockSiteData} />);
    const logo = screen.getByAltText('Guesty Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('guesty-logo.svg'));
  });

  it('renders navigation links', () => {
    render(<Header siteData={mockSiteData} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders logo as link to home', () => {
    render(<Header siteData={mockSiteData} />);
    const logoLink = screen.getByAltText('Guesty Logo').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders navigation items as links', () => {
    render(<Header siteData={mockSiteData} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Features').closest('a')).toHaveAttribute('href', '/features');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact');
  });

  it('returns null when siteData is not provided', () => {
    const { container } = render(<Header siteData={null as unknown as CmsSiteData['site']} />);
    expect(container.firstChild).toBeNull();
  });

  it('uses custom logoUrl when provided', () => {
    const customSiteData: CmsSiteData['site'] = {
      ...mockSiteData,
      logoUrl: '/custom-logo.svg',
    };
    render(<Header siteData={customSiteData} />);
    const logo = screen.getByAltText('Guesty Logo');
    expect(logo).toHaveAttribute('src', expect.stringContaining('custom-logo.svg'));
  });
});

