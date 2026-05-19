import { Fragment } from 'react'
import './App/App.css'
import Notifications from './Notifications/Notifications.jsx'
import Header from './Header/Header.jsx'
import Login from './Login/Login.jsx'
import Footer from './Footer/Footer.jsx'

export default function App() {
  return (
    <Fragment>
      <div className="root-notifications">
        <Notifications />
      </div>
      <Header />
      <Login />
      <Footer />
    </Fragment>
  )
}
