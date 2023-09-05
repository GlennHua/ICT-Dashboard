import { render, screen } from '@testing-library/react'
import LoginButton from '../../Components/Login/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'

jest.mock('@auth0/auth0-react')

describe('it should render login button if current user has not login', ()=>{

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('render LoginButton when not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false
    })
    render(<LoginButton />)
    const loginElement = screen.getByText('Log In')
    expect(loginElement).toBeInTheDocument()
  })

  test('it does not render LoginButton when authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true
    })
    render(<LoginButton />)
    const loginElement = screen.queryByText('Log In')
    expect(loginElement).not.toBeInTheDocument()
  })

})
