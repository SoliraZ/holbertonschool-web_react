import { render, screen, fireEvent, act } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Notifications from "./Notifications";
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

const createStore = (notifications = [], loading = false) =>
  configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState: { notifications: { notifications, loading } },
  });

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

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
    const store = createStore(
      [{ id: 1, type: "default", value: "New course available" }],
      true
    );
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("renders notification list after loading is complete", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ]);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("drawer is hidden by default (no visible class)", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = container.querySelector('[class*="notificationItems"]');
    expect(drawer.className).not.toMatch(/visible_/);
  });

  test("clicking Your notifications adds visible class to drawer", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = container.querySelector('[class*="notificationItems"]');
    expect(drawer.className).not.toMatch(/visible_/);

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).toMatch(/visible_/);
  });

  test("clicking close button removes visible class from drawer", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);
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

  test("it should display 3 notification items", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ]);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(3);
  });

  test('it should display "Your notifications" in all cases', () => {
    const store = createStore([]);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("it should dispatch markNotificationAsRead when a notification item is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ]);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const listItems = screen.getAllByRole("listitem");

    fireEvent.click(listItems[0]);
    expect(store.getState().notifications.notifications).toHaveLength(2);
    expect(
      store.getState().notifications.notifications.find((n) => n.id === 1)
    ).toBeUndefined();

    fireEvent.click(listItems[1]);
    expect(store.getState().notifications.notifications).toHaveLength(1);

    consoleSpy.mockRestore();
  });

  test("should update when the notifications length changes", () => {
    const store = createStore([
      { id: 1, type: "default", value: "Notification 1" },
    ]);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    act(() => {
      store.dispatch(
        fetchNotifications.fulfilled([
          { id: 1, type: "default", value: "Notification 1" },
          { id: 2, type: "urgent", value: "Notification 2" },
        ])
      );
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("Notifications component does not re-render when toggling drawer (DOM manipulation only)", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);

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

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).toMatch(/visible_/);
  });
});
