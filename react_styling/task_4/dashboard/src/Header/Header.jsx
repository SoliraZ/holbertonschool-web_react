import holbertonLogo from '../assets/holberton-logo.jpg'

export default function Header() {
  return (
    <header className="App-header flex flex-col items-center gap-2 border-b-[3px] border-[var(--main-color)] bg-white px-5 py-4 max-[520px]:gap-2 max-[520px]:text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">
      <img
        src={holbertonLogo}
        alt="holberton logo"
        className="block h-[250px] w-[250px] max-[520px]:h-[150px] max-[520px]:w-[150px] sm:h-auto sm:max-h-[88px] sm:w-auto"
      />
      <h1 className="m-0 flex items-center text-lg font-bold leading-tight text-[var(--main-color)] max-[520px]:text-lg sm:text-xl md:text-2xl">
        School dashboard
      </h1>
    </header>
  )
}
