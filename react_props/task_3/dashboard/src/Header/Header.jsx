import React from 'react'
import holbertonLogo from '../assets/holberton-logo.jpg'
import './Header.css'

class Header extends React.Component {
  render() {
    return (
      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
    )
  }
}

export default Header
