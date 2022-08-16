import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import '../../../matchMedia';
import SignUp from '../SignUpScreen/SignUp';

// afterEach(() => {
//   cleanup();
// });
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test('should render SignUp component', () => {
  //   beforeAll(() => {
  //     Object.defineProperty(window, 'matchMedia', {
  //       writable: true,
  //       value: jest.fn().mockImplementation((query) => ({
  //         matches: false,
  //         media: query,
  //         onchange: null,
  //         addListener: jest.fn(), // Deprecated
  //         removeListener: jest.fn(), // Deprecated
  //         addEventListener: jest.fn(),
  //         removeEventListener: jest.fn(),
  //         dispatchEvent: jest.fn(),
  //       })),
  //     });
  //   });
  render(<SignUp />);
  const SignUpElement = screen.getByTestId('comp-1');
  expect(SignUpElement).toBeInTheDocument();
});
