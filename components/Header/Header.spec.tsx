import { render, screen } from '@testing-library/react';
import Header from './index';
import { CmsSiteData } from '@/lib/mockCms';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
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
  it('renders site name', () => {
    render(<Header siteData={mockSiteData} />);
    expect(screen.getByText('Guesty')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header siteData={mockSiteData} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders site name as link to home', () => {
    render(<Header siteData={mockSiteData} />);
    const logoLink = screen.getByText('Guesty').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders navigation items as links', () => {
    render(<Header siteData={mockSiteData} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Features').closest('a')).toHaveAttribute('href', '/features');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact');
  });
});

