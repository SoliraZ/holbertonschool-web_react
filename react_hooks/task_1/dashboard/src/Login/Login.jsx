import { useState } from 'react'
import WithLogging from '../HOC/WithLogging.jsx'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

function Login({ logIn = () => {} }) {
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChangeEmail = (event) => {
    const email = event.target.value
    const { password } = formData

    setFormData({ email, password })
    setEnableSubmit(
      email !== '' &&
        password !== '' &&
        emailRegex.test(email) &&
        password.length >= 8,
    )
  }

  const handleChangePassword = (event) => {
    const password = event.target.value
    const { email } = formData

    setFormData({ email, password })
    setEnableSubmit(
      email !== '' &&
        password !== '' &&
        emailRegex.test(email) &&
        password.length >= 8,
    )
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    logIn(formData.email, formData.password)
  }

  const { email, password } = formData

  return (
    <div className="App-body border-t-[3px] border-[var(--main-color)] bg-white px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-4 text-sm text-black sm:text-base">
        Login to access the full dashboard
      </p>

      <form
        className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email" className="shrink-0 text-sm sm:text-base">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={handleChangeEmail}
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
          value={password}
          onChange={handleChangePassword}
          className="w-full border border-gray-400 p-1.5 sm:w-auto sm:min-w-[160px]"
        />

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="mt-2 w-fit border border-gray-600 px-3 py-1 sm:mt-0 disabled:opacity-50"
        />
      </form>
    </div>
  )
}

export default WithLogging(Login)
