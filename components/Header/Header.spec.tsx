/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// Mock MUI icons
jest.mock('@mui/icons-material/Menu', () => ({
  __esModule: true,
  default: () => <span data-testid="menu-icon">Menu</span>,
}));

jest.mock('@mui/icons-material/Close', () => ({
  __esModule: true,
  default: () => <span data-testid="close-icon">Close</span>,
}));

const mockSiteData: CmsSiteData['site'] = {
  name: 'Guesty',
  logoAltText: 'Guesty Logo',
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
    // Desktop navigation should be visible
    const navLinks = screen.getAllByText('Home');
    expect(navLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('renders logo as link to home', () => {
    render(<Header siteData={mockSiteData} />);
    const logoLink = screen.getByAltText('Guesty Logo').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders navigation items as links', () => {
    render(<Header siteData={mockSiteData} />);
    // Check desktop navigation links (first occurrence)
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');
    const featuresLinks = screen.getAllByText('Features');
    expect(featuresLinks[0].closest('a')).toHaveAttribute('href', '/features');
    const contactLinks = screen.getAllByText('Contact');
    expect(contactLinks[0].closest('a')).toHaveAttribute('href', '/contact');
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

  it('uses fallback alt text when logoAltText is not provided', () => {
    const siteDataWithoutAlt: CmsSiteData['site'] = {
      name: 'Test Company',
      navigation: [
        { label: 'Home', href: '/' },
      ],
    };
    render(<Header siteData={siteDataWithoutAlt} />);
    const logo = screen.getByAltText('Test Company Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders hamburger menu button on mobile', () => {
    render(<Header siteData={mockSiteData} />);
    const menuButton = screen.getByLabelText('open navigation menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile drawer when hamburger menu is clicked', async () => {
    const user = userEvent.setup();
    
    render(<Header siteData={mockSiteData} />);
    const menuButton = screen.getByLabelText('open navigation menu');
    
    await user.click(menuButton);
    
    // Check if drawer is open by looking for close button and navigation items
    expect(screen.getByLabelText('close navigation menu')).toBeInTheDocument();
    // Navigation items should be visible in the drawer
    const navItems = screen.getAllByText(/Home|Features|Contact/);
    expect(navItems.length).toBeGreaterThan(0);
  });
});

