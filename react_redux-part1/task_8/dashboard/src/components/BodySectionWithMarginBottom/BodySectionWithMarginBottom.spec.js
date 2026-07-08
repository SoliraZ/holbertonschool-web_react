import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('Render BodySectionWithMarginBottom with a title and children, verify both are displayed', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="Test Title">
      <p>Test child content</p>
    </BodySectionWithMarginBottom>
  );

  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  expect(screen.getByText('Test child content')).toBeInTheDocument();
  expect(container.firstChild.className).toMatch(/bodySectionWithMargin_/);
});

test('should render BodySection inside a div with class bodySectionWithMargin', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="Hello!">
      <p>This is child content</p>
      <span>Hey there!</span>
    </BodySectionWithMarginBottom>
  );

  const classNames = container.firstChild.className;
  expect(classNames).toMatch(/bodySectionWithMargin_/);
  expect(container.firstChild).toHaveTextContent('Hello!');
  expect(container.firstChild).toHaveTextContent('This is child content');
  expect(container.firstChild).toHaveTextContent('Hey there!');
});
