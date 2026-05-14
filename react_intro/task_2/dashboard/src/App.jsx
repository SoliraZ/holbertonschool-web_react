import './App.css'
import holbertonLogo from './assets/holberton-logo.jpg'
import Notifications from './Notifications.jsx'
import { getCurrentYear, getFooterCopy } from './utils.js'

export default function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>
      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
        <button type="button">OK</button>
      </div>
      <div className="App-footer">
        <p>
          Copyright {getCurrentYear()} {getFooterCopy(false)}
        </p>
      </div>
    </>
  )
}
