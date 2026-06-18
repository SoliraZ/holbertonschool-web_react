import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { getLatestNotification } from '../utils/utils.js'
import newContext from '../Context/context.js'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Login from '../Login/Login.jsx'
import Footer from '../Footer/Footer.jsx'
import CourseList from '../CourseList/CourseList.jsx'
import BodySection from '../BodySection/BodySection.jsx'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
}

export default function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true)
  const [user, setUser] = useState(defaultUser)
  const [notifications, setNotifications] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('/notifications.json')
        const fetchedNotifications = data.map((notification) =>
          notification.id === 3
            ? { ...notification, html: getLatestNotification() }
            : notification,
        )
        setNotifications(fetchedNotifications)
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
        setCourses(data)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log(error)
        }
      }
    }

    fetchCourses()
  }, [user])

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    })
  }, [])

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    })
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    console.log('Notification ' + id + ' has been marked as read')
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    )
  }, [])

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true)
  }, [])

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut],
  )

  return (
    <newContext.Provider value={contextValue}>
      <div className="flex min-h-screen flex-col">
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
        <Header />
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
        <Footer />
      </div>
    </newContext.Provider>
  )
}
