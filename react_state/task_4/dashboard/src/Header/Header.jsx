import React from 'react'
import holbertonLogo from '../assets/holberton-logo.jpg'
import newContext from '../Context/context.js'

class Header extends React.Component {
  static contextType = newContext

  render() {
    const { user, logOut } = this.context

    return (
      <>
        <header className="App-header flex flex-col items-center gap-2 py-4 max-[520px]:py-4 sm:flex-row sm:gap-5 sm:px-5">
          <img
            src={holbertonLogo}
            alt="holberton logo"
            className="h-auto w-[150px] max-[520px]:w-[120px] sm:w-[200px]"
          />
          <h1 className="text-center text-2xl font-bold text-[var(--main-color)] max-[520px]:text-xl sm:text-left sm:text-3xl md:text-4xl">
            School Dashboard
          </h1>
        </header>
        {user.isLoggedIn ? (
          <section id="logoutSection">
            Welcome {user.email} (
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                logOut()
              }}
            >
              logout
            </a>
            )
          </section>
        ) : null}
      </>
    )
  }
}

export default Header
