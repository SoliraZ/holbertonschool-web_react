import { useCallback, useEffect, useReducer } from 'react'
import axios from 'axios'
import { getLatestNotification } from '../utils/utils.js'
import { appReducer, initialState, APP_ACTIONS } from './appReducer.js'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Login from '../Login/Login.jsx'
import Footer from '../Footer/Footer.jsx'
import CourseList from '../CourseList/CourseList.jsx'
import BodySection from '../BodySection/BodySection.jsx'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { displayDrawer, user, notifications, courses } = state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('/notifications.json')
        const fetchedNotifications = data.map((notification) =>
          notification.id === 3
            ? { ...notification, html: getLatestNotification() }
            : notification,
        )
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: fetchedNotifications })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log(error)
        }
      }
    }

    fetchNotifications()
  }, [])

  useEffect(() => {
    if (!user.isLoggedIn) return

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/courses.json')
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: data })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log(error)
        }
      }
    }

    fetchCourses()
  }, [user])

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } })
  }, [])

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT })
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    console.log('Notification ' + id + ' has been marked as read')
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id })
  }, [])

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER })
  }, [])

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Notifications
        notifications={notifications}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <Header user={user} logOut={logOut} />
      <main className="App-body flex flex-1 flex-col">
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} />
          </BodySectionWithMarginBottom>
        )}
        <div className="mt-auto">
          <BodySection title="News from the School">
            <p>
              ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique, asperiores architecto blanditiis fuga doloribus sit
              illum aliquid ea distinctio minus accusantium, impedit quo
              voluptatibus ut magni dicta. Recusandae, quia dicta?
            </p>
            <p>Holberton School News goes here</p>
          </BodySection>
        </div>
      </main>
      <Footer user={user} />
    </div>
  )
}
