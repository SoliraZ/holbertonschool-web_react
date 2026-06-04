import holbertonLogo from '../assets/holberton-logo.jpg'

export default function Header() {
  return (
    <header className="App-header flex flex-row items-center gap-5 px-5 py-4 bg-white">
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="block h-auto max-h-[88px] w-auto"
      />
      <h1 className="m-0 flex items-center text-[var(--main-color)] text-3xl font-bold leading-tight">
        School dashboard
      </h1>
    </header>
  )
}
