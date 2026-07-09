import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('Render with default type and verify text is displayed with blue color', () => {
  render(
    <NotificationItem
      id={1}
      type="default"
      value="New course available"
      markAsRead={jest.fn()}
    />
  );

  const item = screen.getByRole('listitem');
  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('data-notification-type', 'default');
  expect(item.style.color).toBe('blue');
  expect(item).toHaveTextContent('New course available');
});

test('Render with urgent type and verify text is displayed with red color', () => {
  render(
    <NotificationItem
      id={2}
      type="urgent"
      value="Urgent requirement"
      markAsRead={jest.fn()}
    />
  );

  const item = screen.getByRole('listitem');
  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('data-notification-type', 'urgent');
  expect(item.style.color).toBe('red');
  expect(item).toHaveTextContent('Urgent requirement');
});

test('it should call markAsRead with the correct id when the notification item is clicked', () => {
  const mockMarkAsRead = jest.fn();

  render(
    <NotificationItem
      id={42}
      type="default"
      value="Test notification"
      markAsRead={mockMarkAsRead}
    />
  );

  fireEvent.click(screen.getByRole('listitem'));

  expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
  expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});

describe('NotificationItem - React.memo behavior', () => {
  let markAsRead;

  beforeEach(() => {
    jest.clearAllMocks();
    markAsRead = jest.fn();
  });

  test('should update when props change', () => {
    const { rerender, container } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const firstRender = container.querySelector('[data-notification-type]').textContent;

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="Updated notification"
        markAsRead={markAsRead}
      />
    );

    const secondRender = container.querySelector('[data-notification-type]').textContent;
    expect(secondRender).not.toBe(firstRender);
    expect(secondRender).toBe('Updated notification');
  });

  test('should not re-render when props do not change', () => {
    const { rerender, container } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const firstElement = container.querySelector('[data-notification-type]');

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="New notification"
        markAsRead={markAsRead}
      />
    );

    const secondElement = container.querySelector('[data-notification-type]');
    expect(secondElement.textContent).toBe(firstElement.textContent);
  });
});
