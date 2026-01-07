import { extractUtmParams, track, trackPageView, trackCtaClick } from './index';

// Mock console.log
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('tracking', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('extractUtmParams', () => {
    it('extracts UTM parameters from URLSearchParams', () => {
      const params = new URLSearchParams('utm_source=google&utm_medium=cpc&utm_campaign=summer');
      const result = extractUtmParams(params);

      expect(result).toEqual({
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'summer',
      });
    });

    it('returns undefined for missing UTM parameters', () => {
      const params = new URLSearchParams('other=value');
      const result = extractUtmParams(params);

      expect(result).toEqual({
        utm_source: undefined,
        utm_medium: undefined,
        utm_campaign: undefined,
      });
    });

    it('handles empty URLSearchParams', () => {
      const params = new URLSearchParams();
      const result = extractUtmParams(params);

      expect(result).toEqual({
        utm_source: undefined,
        utm_medium: undefined,
        utm_campaign: undefined,
      });
    });
  });

  describe('track', () => {
    it('logs event with payload', () => {
      track('test_event', { key: 'value' });
      expect(consoleSpy).toHaveBeenCalledWith('[track]', 'test_event', { key: 'value' });
    });

    it('logs event without payload', () => {
      track('test_event');
      expect(consoleSpy).toHaveBeenCalledWith('[track]', 'test_event', {});
    });
  });

  describe('trackPageView', () => {
    it('tracks page view with UTM parameters', () => {
      const params = new URLSearchParams('utm_source=google&utm_medium=cpc');
      trackPageView('/test', params);

      expect(consoleSpy).toHaveBeenCalledWith(
        '[track]',
        'page_view',
        expect.objectContaining({
          path: '/test',
          utm_source: 'google',
          utm_medium: 'cpc',
        })
      );
    });

    it('tracks page view without search params', () => {
      trackPageView('/test');
      expect(consoleSpy).toHaveBeenCalledWith(
        '[track]',
        'page_view',
        expect.objectContaining({
          path: '/test',
        })
      );
    });
  });

  describe('trackCtaClick', () => {
    it('tracks CTA click with UTM parameters', () => {
      const params = new URLSearchParams('utm_source=google');
      trackCtaClick('Sign Up', '/signup', params);

      expect(consoleSpy).toHaveBeenCalledWith(
        '[track]',
        'cta_click',
        expect.objectContaining({
          cta_text: 'Sign Up',
          cta_href: '/signup',
          utm_source: 'google',
        })
      );
    });

    it('tracks CTA click without search params', () => {
      trackCtaClick('Click Me', '/link');
      expect(consoleSpy).toHaveBeenCalledWith(
        '[track]',
        'cta_click',
        expect.objectContaining({
          cta_text: 'Click Me',
          cta_href: '/link',
        })
      );
    });
  });
});

