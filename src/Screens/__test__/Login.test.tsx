import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../LoginScreen/Login';

// afterEach(() => {
//   cleanup();
// });

test('should render Login component', () => {
  render(<Login />);
  const LoginElement = screen.getByTestId('comp-2');
  expect(LoginElement).toBeInTheDocument();
});

test('should render H3 element in Login component', () => {
  render(<Login />);
  const h3Element = screen.getByTestId('h3');
  expect(h3Element).toBeInTheDocument();
  expect(h3Element).toHaveTextContent('Welcome Back!');
});

test('should render label element with input tag init in Login component', () => {
  render(<Login />);
  const labelElement = screen.getByTestId('label');
  const inputElement = screen.getByTestId('input');
  expect(labelElement).toBeInTheDocument();
  expect(labelElement).toHaveTextContent('Email address');
  expect(labelElement).toContainElement(inputElement);
});

test('should render button element in Login component', () => {
  render(<Login />);
  const LoginElement = screen.getByTestId('comp-2');
  const buttonElement = screen.getByTestId('button');
  expect(LoginElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('Continue');
  expect(LoginElement).toContainElement(buttonElement);
});

test('should render span element with meta info in Login component', () => {
  render(<Login />);
  const LoginElement = screen.getByTestId('comp-2');
  const spanElement = screen.getByTestId('meta');
  expect(LoginElement).toBeInTheDocument();
  expect(spanElement).toBeInTheDocument();
  expect(spanElement).toHaveTextContent('Forgot Password?');
  expect(LoginElement).toContainElement(spanElement);
});
