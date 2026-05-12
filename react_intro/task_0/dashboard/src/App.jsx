import './App.css'
import holbertonLogo from './assets/holberton-logo.jpg'

export default function App() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div className="App-footer">
        <p>Copyright {currentYear} - holberton School</p>
      </div>
    </>
  )
}
