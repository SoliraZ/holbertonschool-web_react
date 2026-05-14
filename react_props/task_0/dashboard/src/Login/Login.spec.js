import { render } from '@testing-library/react'
import Login from './Login.jsx'

describe('Login', () => {
  it('renders without crashing', () => {
    render(<Login />)
  })
})
