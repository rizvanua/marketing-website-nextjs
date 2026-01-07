import { render, screen } from '@testing-library/react';
import Footer from './index';
import { CmsSiteData } from '@/lib/mockCms';

const mockSiteData: CmsSiteData['site'] = {
  name: 'Guesty',
  navigation: [],
};

describe('Footer', () => {
  it('renders copyright with site name', () => {
    render(<Footer siteData={mockSiteData} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Guesty. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    render(<Footer siteData={mockSiteData} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});

