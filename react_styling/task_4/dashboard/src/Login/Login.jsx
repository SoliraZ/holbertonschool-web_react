import WithLogging from '../HOC/WithLogging.jsx'

function Login() {
  return (
    <div className="App-body h-full border-t-[3px] border-[var(--main-color)] bg-white px-5 pt-5 max-[640px]:px-4 sm:ml-5 sm:py-7">
      <p className="m-0 mb-4 text-[0.95rem] font-normal text-black">
        Login to access the full dashboard
      </p>

      <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        <label htmlFor="email" className="shrink-0">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="w-full min-w-0 border border-gray-400 p-1.5 max-[640px]:max-w-full sm:mr-4 sm:w-auto"
        />

        <label htmlFor="password" className="shrink-0">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          className="w-full min-w-0 border border-gray-400 p-1.5 max-[640px]:max-w-full sm:mr-4 sm:w-auto"
        />
      </form>
      <button
        type="button"
        className="mt-3 border border-gray-600 px-3 py-1"
      >
        OK
      </button>
    </div>
  )
}

export default WithLogging(Login)
