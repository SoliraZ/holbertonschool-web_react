import './App.css'
import logo from './assets/holberton-logo.jpg'

export function App() {
  const year = new Date().getFullYear()

  return (
    <>
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <footer className="App-footer">
        <p>{`Copyright ${year} - Holberton School`}</p>
      </footer>
    </>
  )
}

export default App
