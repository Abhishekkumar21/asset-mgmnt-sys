import '@testing-library/jest-dom';
import { TextEncoder} from 'util';
import {  TextDecoder } from 'text-encoding';

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Suppress console warnings and errors during tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args: any[]) => {
  if (
    /Warning.*not wrapped in act/i.test(args[0]) ||
    /Warning: An update to/i.test(args[0]) ||
    /Warning: Cannot update a component/i.test(args[0])
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

console.warn = (...args: any[]) => {
  if (
    /Warning: ReactDOM.render is no longer supported/i.test(args[0]) ||
    /Warning: useLayoutEffect does nothing on the server/i.test(args[0])
  ) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};
