import { render, screen, fireEvent, act } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Notifications from "./Notifications";
import notificationsReducer, {
  fetchNotifications,
} from "../../features/notifications/notificationsSlice";
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

const createStore = (notifications = [], displayDrawer = true) =>
  configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState: { notifications: { notifications, displayDrawer } },
  });

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("hides drawer when close button is clicked", () => {
    const store = createStore([
      { id: 1, type: "default", value: "New course available" },
    ]);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: /close/i });
    fireEvent.click(buttonElement);

    expect(store.getState().notifications.displayDrawer).toBe(false);
  });

  test("it should display 3 notification items as expected through store", () => {
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

  test('it should not display a title, button and a 3 list items, whenever the "displayDrawer" set to false', () => {
    const store = createStore(
      [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      false
    );
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationsTitle = screen.queryByText(
      /here is the list of notifications/i
    );
    const notificationsButton = screen.queryByRole("button");
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsTitle).toBeNull();
    expect(notificationsButton).toBeNull();
    expect(notificationsListItems).toHaveLength(0);
  });

  test('it should display a paragraph of "No new notifications for now" whenever the notifications list is empty', () => {
    const store = createStore([], true);
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationsTitle = screen.getByText(/no new notifications for now/i);
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsListItems).toHaveLength(0);
    expect(notificationsTitle).toBeInTheDocument();
  });

  test('it should display "Your notifications" in all cases', () => {
    const store1 = createStore([], false);
    const { unmount: unmount1 } = render(
      <Provider store={store1}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount1();

    const store2 = createStore([], true);
    const { unmount: unmount2 } = render(
      <Provider store={store2}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount2();

    const store3 = createStore(
      [{ id: 1, type: "default", value: "New course available" }],
      true
    );
    render(
      <Provider store={store3}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("it should display close button, p element, and notification items when displayDrawer is true", () => {
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

    const closeButton = screen.getByRole("button", { name: /close/i });
    const pElement = screen.getByText(/here is the list of notifications/i);
    const listItems = screen.getAllByRole("listitem");

    expect(closeButton).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
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

  test("should maintain same content when notifications are unchanged", () => {
    const notifications = [
      { id: 1, type: "default", value: "Notification 1" },
      { id: 2, type: "urgent", value: "Notification 2" },
    ];
    const store = createStore(notifications);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const firstListItems = screen.getAllByRole("listitem");
    expect(firstListItems).toHaveLength(2);

    act(() => {
      store.dispatch(fetchNotifications.fulfilled(notifications));
    });

    const secondListItems = screen.getAllByRole("listitem");
    expect(secondListItems).toHaveLength(2);
    expect(secondListItems[0].textContent).toBe(firstListItems[0].textContent);
  });

  test('should dispatch showDrawer when "Your notifications" is clicked', () => {
    const store = createStore([], false);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationTitle = screen.getByText("Your notifications");
    fireEvent.click(notificationTitle);

    expect(store.getState().notifications.displayDrawer).toBe(true);
  });

  test("should dispatch hideDrawer when close button is clicked", () => {
    const store = createStore(
      [{ id: 1, type: "default", value: "Test notification" }],
      true
    );

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(store.getState().notifications.displayDrawer).toBe(false);
  });
});
