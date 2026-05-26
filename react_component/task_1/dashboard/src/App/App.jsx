import React, { Fragment } from 'react'
import { getLatestNotification } from '../utils/utils.js'
import './App.css'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Login from '../Login/Login.jsx'
import Footer from '../Footer/Footer.jsx'

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

    return (
      <Fragment>
        <div className="root-notifications">
          <Notifications notifications={notificationsList} />
        </div>
        <Header />
        <Login />
        <Footer />
      </Fragment>
    )
  }
}

App.defaultProps = {
  logOut: () => {},
}

export default App
