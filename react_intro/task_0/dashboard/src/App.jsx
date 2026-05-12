import holbertonLogo from './assets/holberton-logo.jpg'
import './App.css'

export default function App() {
  const year = new Date().getFullYear()

  return (
    <div className="App">
      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div className="App-footer">
        <p>
          Copyright {year} - holberton School
        </p>
      </div>
    </div>
  )
}
