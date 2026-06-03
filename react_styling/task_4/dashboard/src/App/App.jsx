import React from 'react'
import { getLatestNotification } from '../utils/utils.js'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Login from '../Login/login.jsx'
import Footer from '../Footer/Footer.jsx'
import CourseList from '../CourseList/CourseList.jsx'
import BodySection from '../BodySection/BodySection.jsx'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'

class App extends React.Component {
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
      this.props.logOut()
    }
  }

  render() {
    const { isLoggedIn } = this.props
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

    return (
      <div className="min-h-screen flex w-full flex-col px-4 sm:px-6 md:px-8">
        <Notifications notifications={notificationsList} />
        <Header />
        <main className="App-body flex-1 flex flex-col">
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>
              ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique, asperiores architecto blanditiis fuga doloribus sit
              illum aliquid ea distinctio minus accusantium, impedit quo
              voluptatibus ut magni dicta. Recusandae, quia dicta?
            </p>
            <p>Holberton School News goes here</p>
          </BodySection>
          <Footer />
        </main>
      </div>
    )
  }
}

App.defaultProps = {
  logOut: () => {},
  isLoggedIn: false,
}

export default App
