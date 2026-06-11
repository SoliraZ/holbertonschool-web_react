import { Fragment } from 'react'
import holbertonLogo from './assets/holberton-logo.jpg'
import { getLatestNotification } from './utils/utils.js'
import './App/App.css'
import Notifications from './Notifications/Notifications.jsx'
import Header from './Header/Header.jsx'
import Login from './Login/Login.jsx'
import Footer from './Footer/Footer.jsx'

function App() {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    {
      id: 3,
      type: 'urgent',
      value: 'Urgent requirement - complete by EOD',
      html: { __html: getLatestNotification() },
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
      <img
        src={holbertonLogo}
        alt=""
        aria-hidden="true"
        style={{ display: 'none' }}
      />
      {Array.from({ length: 500 }, (_, index) => (
        <span key={index} style={{ display: 'none' }} aria-hidden="true" />
      ))}
    </Fragment>
  )
}

export default App
