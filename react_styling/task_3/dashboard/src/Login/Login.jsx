import WithLogging from '../HOC/WithLogging.jsx'

function Login() {
  return (
    <div className="App-body flex-1 border-t-[3px] border-[var(--main-color)] bg-white px-5 py-7">
      <p className="m-0 mb-4 text-[0.95rem] font-normal text-black">
        Login to access the full dashboard
      </p>

      <form className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
        <label htmlFor="email" className="shrink-0">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="min-w-[12rem] border border-gray-400 px-2 py-1"
        />

        <label htmlFor="password" className="shrink-0">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="min-w-[12rem] border border-gray-400 px-2 py-1"
        />

        <button type="button" className="border border-gray-800 px-4 py-1">
          OK
        </button>
      </form>
    </div>
  )
}

export default WithLogging(Login)
