import { render, screen } from '@testing-library/react'
import ProfilePage from '../../Components/Login/ProfilePage'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'

jest.mock('@auth0/auth0-react')

describe('it should render profile page if current user has login', ()=>{
   
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('render ProfilePage when authenticated', () => {
    useAuth0.mockReturnValue({
        isAuthenticated: true,
        user: { 
            email: 'test@gmail.com',
            AdminType: ['IsAdmin']
        }
    })
    render(
    <BrowserRouter>
        <ProfilePage />
    </BrowserRouter>
    )
    const profileElement = screen.getByText('Email: test@gmail.com')
    expect(profileElement).toBeInTheDocument()
  })

  test('it does not render ProfilePage when not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false
    })
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    render(
        <BrowserRouter>
            <ProfilePage />
        </BrowserRouter>
        )
    expect(alertMock).toHaveBeenCalledTimes(1);
  })

})