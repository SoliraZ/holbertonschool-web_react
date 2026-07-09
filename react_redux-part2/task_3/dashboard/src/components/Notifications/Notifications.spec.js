import { render, screen, fireEvent, act } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Notifications from "./Notifications";
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";

const urgentNotifications = [
  { id: "u1", type: "urgent", isRead: false, value: "Urgent notification 1" },
  { id: "u2", type: "urgent", isRead: false, value: "Urgent notification 2" },
];

const defaultNotifications = [
  { id: "d1", type: "default", isRead: false, value: "Default notification 1" },
  { id: "d2", type: "default", isRead: false, value: "Default notification 2" },
];

const mixedNotifications = [...urgentNotifications, ...defaultNotifications];

const createStore = (notifications = [], loading = false) =>
  configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState: { notifications: { notifications, loading } },
  });

describe("Notifications component", () => {
  test("displays Loading... while data is being fetched", () => {
    const store = createStore([], true);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("does not display notification list while loading", () => {
    const store = createStore(urgentNotifications, true);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("renders notification list after loading is complete", () => {
    const store = createStore(mixedNotifications);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  test("drawer is hidden by default (no visible class)", () => {
    const store = createStore(urgentNotifications);
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = container.querySelector('[class*="notificationItems"]');
    expect(drawer.className).not.toMatch(/visible_/);
  });

  test("clicking Your notifications adds visible class to drawer", () => {
    const store = createStore(urgentNotifications);
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = container.querySelector('[class*="notificationItems"]');
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).toMatch(/visible_/);
  });

  test("clicking close button removes visible class from drawer", () => {
    const store = createStore(urgentNotifications);
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = container.querySelector('[class*="notificationItems"]');
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).toMatch(/visible_/);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(drawer.className).not.toMatch(/visible_/);
  });

  test("filter buttons are rendered when notifications are present", () => {
    const store = createStore(mixedNotifications);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByRole("button", { name: /filter urgent/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter default/i })).toBeInTheDocument();
  });

  test("clicking ‼️ button filters to show only urgent notifications", () => {
    const store = createStore(mixedNotifications);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(4);

    fireEvent.click(screen.getByRole("button", { name: /filter urgent/i }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(screen.getByText("Urgent notification 1")).toBeInTheDocument();
    expect(screen.getByText("Urgent notification 2")).toBeInTheDocument();
    expect(screen.queryByText("Default notification 1")).not.toBeInTheDocument();
  });

  test("clicking ?? button filters to show only default notifications", () => {
    const store = createStore(mixedNotifications);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /filter default/i }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(screen.getByText("Default notification 1")).toBeInTheDocument();
    expect(screen.queryByText("Urgent notification 1")).not.toBeInTheDocument();
  });

  test("clicking urgent filter button again toggles back to all notifications", () => {
    const store = createStore(mixedNotifications);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /filter urgent/i }));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: /filter urgent/i }));
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  test("clicking default filter button again toggles back to all notifications", () => {
    const store = createStore(mixedNotifications);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /filter default/i }));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: /filter default/i }));
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  test("dispatches markNotificationAsRead when a notification is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const store = createStore(mixedNotifications);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const listItems = screen.getAllByRole("listitem");
    fireEvent.click(listItems[0]);

    expect(store.getState().notifications.notifications).toHaveLength(3);
    expect(
      store.getState().notifications.notifications.find((n) => n.id === "u1")
    ).toBeUndefined();

    consoleSpy.mockRestore();
  });

  test("should update when the notifications list changes via dispatch", () => {
    const store = createStore(urgentNotifications);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    act(() => {
      store.dispatch(
        fetchNotifications.fulfilled([
          ...urgentNotifications,
          { id: "d1", type: "default", isRead: false, value: "Default notification 1" },
        ])
      );
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test('displays "Your notifications" in all cases', () => {
    const store = createStore([]);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });
});
