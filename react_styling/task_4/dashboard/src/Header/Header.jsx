import holbertonLogo from '../assets/holberton-logo.jpg'

export default function Header() {
  return (
    <header className="App-header flex flex-col items-center gap-2 border-b-[3px] border-[var(--main-color)] bg-white px-5 py-4 text-center max-[520px]:gap-2 sm:flex-row sm:items-center sm:gap-5 sm:text-left">
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="block h-[250px] w-[250px] max-[520px]:h-[150px] max-[520px]:w-[150px] sm:h-auto sm:max-h-[88px] sm:w-auto"
      />
      <h1 className="m-0 flex items-center text-3xl font-bold leading-tight text-[var(--main-color)] max-[520px]:text-3xl sm:text-xl md:text-2xl">
        School dashboard
      </h1>
    </header>
  )
}
