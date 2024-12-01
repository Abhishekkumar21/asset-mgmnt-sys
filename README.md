# Employee Asset Management Frontend

A comprehensive web application to track and manage company assets across employee lifecycles.

## Project Overview

- **Framework**: React with TypeScript
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit (planned)
- **Routing**: React Router
- **Testing**: Jest + React Testing Library

## Testing Documentation

### Test Setup

The project uses Jest and React Testing Library for testing. Here's a breakdown of the testing infrastructure:

#### 1. Key Testing Dependencies

```json
{
  "@testing-library/react": "^16.0.1",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^14.5.2",
  "jest": "latest",
  "ts-jest": "latest",
  "jest-environment-jsdom": "latest"
}
```

#### 2. Configuration Files

- **jest.config.js**: Main Jest configuration
  ```javascript
  {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
  }
  ```

- **setupTests.ts**: Jest DOM setup
  ```typescript
  import '@testing-library/jest-dom';
  ```

#### 3. Test File Structure

Tests are located in the `src/tests` directory and follow the naming convention `*.test.tsx`.

### Writing Tests

#### 1. Mocking External Dependencies

We use Jest's mocking capabilities to mock external dependencies. Here are some examples:

##### Mocking Ant Design Components
```typescript
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn()
  }
}));
```

##### Mocking Auth Service
```typescript
jest.mock('../services/authService', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn()
  }
}));
```

#### 2. Test Utilities

##### Test Wrapper
We provide a utility function to wrap components with necessary providers:
```typescript
const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};
```

### Running Tests

1. Run all tests:
   ```bash
   npm test
   ```

2. Run tests in watch mode:
   ```bash
   npm test -- --watch
   ```

3. Run tests with coverage:
   ```bash
   npm test -- --coverage
   ```

### Test Examples

#### 1. Authentication Tests

We test both the Login and Register components:

##### Login Tests
- Successful admin login
- Successful employee login
- Invalid credentials handling

##### Register Tests
- Successful user registration
- Form validation
- Error handling

Example test structure:
```typescript
describe('Authentication Tests', () => {
  describe('Login Component', () => {
    test('successful admin login', async () => {
      // Test implementation
    });
  });

  describe('Register Component', () => {
    test('successful registration', async () => {
      // Test implementation
    });
  });
});
```

### Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Cleanup**: Use `beforeEach` and `afterEach` for setup and cleanup
3. **Mocking**: Mock external dependencies and services
4. **User-centric**: Test from the user's perspective using React Testing Library
5. **Meaningful Assertions**: Write clear, purposeful assertions

### Common Testing Patterns

1. **Form Submissions**
```typescript
// Fill form
fireEvent.change(screen.getByPlaceholderText(/email/i), {
  target: { value: 'test@example.com' }
});

// Submit form
fireEvent.click(screen.getByText(/submit/i));

// Wait for response
await waitFor(() => {
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

2. **Async Operations**
```typescript
test('async operation', async () => {
  // Trigger async action
  await waitFor(() => {
    // Assert results
  });
});
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React contexts
├── pages/         # Page components
├── services/      # API services
├── tests/         # Test files
├── types/         # TypeScript types
└── utils/         # Utility functions
