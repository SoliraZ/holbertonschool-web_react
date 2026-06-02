import WithLogging from '../HOC/WithLogging.jsx'

function Login() {
  return (
    <div className="App-body h-full border-t-[3px] border-[var(--main-color)] bg-white pt-5 max-[640px]:ml-0 max-[640px]:pl-4 sm:ml-5 sm:px-5 sm:py-7">
      <p className="m-0 mb-4 text-[0.95rem] font-normal text-black">
        Login to access the full dashboard
      </p>

      <form className="flex max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        <label htmlFor="email" className="shrink-0 sm:mr-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="w-full min-w-0 rounded border border-gray-300 p-2 sm:mr-4 sm:w-auto max-[640px]:max-w-full"
        />

        <label htmlFor="password" className="shrink-0 sm:mr-2">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          className="w-full min-w-0 rounded border border-gray-300 p-2 sm:mr-4 sm:w-auto max-[640px]:max-w-full"
        />
      </form>
      <button
        type="button"
        className="mt-2 self-start border border-gray-800 px-4 py-2"
      >
        OK
      </button>
    </div>
  )
}

export default WithLogging(Login)
