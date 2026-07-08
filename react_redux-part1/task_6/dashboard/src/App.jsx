import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from './features/notifications/notificationsSlice';
import { fetchCourses } from './features/courses/coursesSlice';

const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
});

export default function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);
  const notifications = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchCourses());
  }, [isLoggedIn, dispatch]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch(showDrawer());
  }, [dispatch]);

  const handleHideDrawer = useCallback(() => {
    dispatch(hideDrawer());
  }, [dispatch]);

  const handleMarkNotificationAsRead = useCallback((id) => {
    dispatch(markNotificationAsRead(id));
  }, [dispatch]);

  return (
    <div className={css(styles.app)}>
      <Notifications
        notifications={notifications}
        handleHideDrawer={handleHideDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        displayDrawer={displayDrawer}
        markNotificationAsRead={handleMarkNotificationAsRead}
      />
      <>
        <Header />
        {!isLoggedIn ? (
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title='Course list'>
            <CourseList />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer />
    </div>
  );
}
