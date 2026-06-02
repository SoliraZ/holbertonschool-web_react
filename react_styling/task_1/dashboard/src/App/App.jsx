import React, { Fragment } from 'react'
import { getLatestNotification } from '../utils/utils.js'
import './App.css'
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
      <Fragment>
        <div className="root-notifications">
          <Notifications notifications={notificationsList} />
        </div>
        <Header />
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
          <p>Holberton School News goes here</p>
        </BodySection>
        <Footer />
      </Fragment>
    )
  }
}

App.defaultProps = {
  logOut: () => {},
  isLoggedIn: false,
}

export default App
