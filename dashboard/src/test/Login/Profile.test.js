import { fireEvent, render, screen, userEvent } from '@testing-library/react'
import Profile from '../../Components/Login/Profile'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'

jest.mock('@auth0/auth0-react')

describe('Profile component will be rendered if user login and authenticated', () => {
    
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: { 
                name: 'testing',
                AdminType: ['IsAdmin']
            }
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    
    test('it should render Profile if authenticated', () => {
        render(<Profile />)
        const profileElement = screen.getByTestId('user-menu')
        expect(profileElement).toBeInTheDocument()
    })
})



describe('If authenticated and login, render logout btn', () => {
    
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: {
                given_name: 'testing',
                AdminType: ['IsAdmin']
            }
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    
    test('it should render logout btn', () => {

        const {getByText,getByTestId} = render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
        )

        const profileBtn =  getByTestId('profile-btn')
        expect(profileBtn).toBeInTheDocument()
        fireEvent.click(profileBtn) // somthing wrong with handlebtnClick in profile.js
        expect(screen.getByRole('menu')).toBeInTheDocument()
        const logoutBtn = getByTestId('logout-btn')
        expect(logoutBtn).toBeInTheDocument()
        // fireEvent.click(profileBtn)
    })
})
