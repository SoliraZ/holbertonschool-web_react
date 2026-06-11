import { Fragment } from 'react'
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
      {Array.from({ length: 500 }, (_, index) => (
        <span key={index} style={{ display: 'none' }} aria-hidden="true" />
      ))}
    </Fragment>
  )
}

export default App
