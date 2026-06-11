import React from 'react'
import { getLatestNotification } from '../utils/utils.js'
import newContext from '../Context/context.js'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Login from '../Login/Login.jsx'
import Footer from '../Footer/Footer.jsx'
import CourseList from '../CourseList/CourseList.jsx'
import BodySection from '../BodySection/BodySection.jsx'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    value: 'Urgent requirement - complete by EOD',
    html: getLatestNotification(),
  },
]

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

class App extends React.Component {
  constructor(props) {
    super(props)
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    }
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this)
    this.state = {
      displayDrawer: false,
      user,
      notifications: notificationsList,
      courses: coursesList,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    }
  }

  logIn = (email, password) => {
    const user = {
      email,
      password,
      isLoggedIn: true,
    }
    this.setState({
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    })
  }

  logOut = () => {
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    }
    this.setState({
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    })
  }

  markNotificationAsRead(id) {
    console.log('Notification ' + id + ' has been marked as read')
    this.setState({
      notifications: this.state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true })
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    const keysPressed = { h: true }

    if (event.ctrlKey && event.key in keysPressed) {
      alert('Logging you out')
      this.logOut()
    }
  }

  render() {
    const { user, contextValue, notifications, courses } = this.state

    return (
      <newContext.Provider value={contextValue}>
        <div className="flex min-h-screen flex-col">
          <Notifications
            notifications={notifications}
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <Header />
          <main className="App-body flex flex-1 flex-col">
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={courses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login
                  logIn={this.logIn}
                  email={user.email}
                  password={user.password}
                />
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
}

export default App
