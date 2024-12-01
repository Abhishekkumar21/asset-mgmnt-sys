import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import React from 'react';

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

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
}
window.IntersectionObserver = MockIntersectionObserver as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock getComputedStyle
window.getComputedStyle = jest.fn().mockImplementation(() => ({
  getPropertyValue: jest.fn().mockReturnValue(''),
}));

// Mock Ant Design components
jest.mock('antd', () => {
  const MockFormItem = ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'form-item', ...props }, children);

  const MockInput = ({ ...props }: any) => 
    React.createElement('input', { 'data-testid': 'input', ...props });

  const MockPassword = ({ ...props }: any) => 
    React.createElement('input', { 'data-testid': 'password-input', type: 'password', ...props });

  const MockButton = ({ children, ...props }: any) => 
    React.createElement('button', { 'data-testid': 'button', ...props }, children);

  const MockCard = ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'card', ...props }, children);

  const MockRow = ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'row', ...props }, children);

  const MockCol = ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'col', ...props }, children);

  const MockTitle = ({ children, ...props }: any) => 
    React.createElement('h1', { 'data-testid': 'title', ...props }, children);

  const MockText = ({ children, ...props }: any) => 
    React.createElement('span', { 'data-testid': 'text', ...props }, children);

  const MockSelect = ({ children, ...props }: any) => 
    React.createElement('select', { 'data-testid': 'select', ...props }, children);

  const MockOption = ({ children, ...props }: any) => 
    React.createElement('option', { 'data-testid': 'select-option', ...props }, children);

  const MockSpin = ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'spin', ...props }, children);

  MockInput.Password = MockPassword;
  MockSelect.Option = MockOption;

  return {
    Form: {
      Item: MockFormItem,
      useForm: () => [{
        validateFields: jest.fn().mockImplementation(async () => ({})),
        setFieldsValue: jest.fn(),
        getFieldValue: jest.fn(),
        getFieldsValue: jest.fn(),
        resetFields: jest.fn(),
      }],
    },
    Input: MockInput,
    Button: MockButton,
    Card: MockCard,
    Row: MockRow,
    Col: MockCol,
    Typography: {
      Title: MockTitle,
      Text: MockText,
    },
    Select: MockSelect,
    Spin: MockSpin,
    message: {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn(),
    },
  };
});

// Suppress console errors and warnings
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args: any[]) => {
  if (
    /Warning.*not wrapped in act/.test(args[0]) ||
    /Warning.*Cannot update a component/.test(args[0]) ||
    /Warning.*React.createElement: type is invalid/.test(args[0]) ||
    /Warning.*Failed prop type/.test(args[0]) ||
    /Warning/.test(args[0]) ||
    /React does not recognize the.*prop on a DOM element/.test(args[0]) ||
    /validateDOMNesting/.test(args[0]) ||
    /Not implemented/.test(args[0]) ||
    /Error: Uncaught/.test(args[0]) ||
    /antd/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};

console.warn = (...args: any[]) => {
  if (
    /Warning.*not wrapped in act/.test(args[0]) ||
    /Warning.*Cannot update a component/.test(args[0]) ||
    /Warning.*React.createElement: type is invalid/.test(args[0]) ||
    /Warning.*Failed prop type/.test(args[0]) ||
    /Warning/.test(args[0]) ||
    /antd/.test(args[0]) ||
    /componentWillReceiveProps/.test(args[0]) ||
    /componentWillMount/.test(args[0])
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};
