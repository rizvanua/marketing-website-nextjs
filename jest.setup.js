// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Suppress jsdom navigation errors (harmless - jsdom doesn't implement full navigation)
// These errors occur when testing Next.js Link components - they're expected and don't affect tests
const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    // Filter out jsdom navigation errors - check all arguments
    const shouldSuppress = args.some((arg) => {
      if (!arg) return false
      const str = String(arg)
      return str.includes('Not implemented: navigation')
    })
    
    if (shouldSuppress) {
      return
    }
    
    originalError?.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

