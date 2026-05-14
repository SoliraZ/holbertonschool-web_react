import { render } from '@testing-library/react'
import Notifications from './Notifications.jsx'

describe('Notifications', () => {
  it('renders without crashing', () => {
    render(<Notifications />)
  })
})
