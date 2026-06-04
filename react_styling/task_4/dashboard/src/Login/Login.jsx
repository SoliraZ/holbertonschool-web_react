import WithLogging from '../HOC/WithLogging.jsx'

function Login() {
  return (
    <div className="App-body border-t-[3px] border-[var(--main-color)] bg-white px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-4 text-sm text-black sm:text-base">
        Login to access the full dashboard
      </p>

      <form className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        <label htmlFor="email" className="shrink-0 text-sm sm:text-base">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="w-full border border-gray-400 p-1.5 sm:w-auto sm:min-w-[160px]"
        />

        <label htmlFor="password" className="shrink-0 text-sm sm:text-base">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          className="w-full border border-gray-400 p-1.5 sm:w-auto sm:min-w-[160px]"
        />

        <button
          type="button"
          className="mt-2 w-fit border border-gray-600 px-3 py-1 sm:mt-0"
        >
          OK
        </button>
      </form>
    </div>
  )
}

export default WithLogging(Login)
