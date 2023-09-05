import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Bar } from '../SharedComponent/SharedBarContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import {ThemeProvider} from '@mui/material/styles'
import { mdTheme } from '../SharedComponent/AppBarDrawer'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0()
  useEffect (() => {
    if (!isAuthenticated) {
      alert('Please login first')
      navigate('/')
    }
  }, [isAuthenticated])
  return (
      isAuthenticated && (
      <ThemeProvider theme={mdTheme} >
        <Box sx={{ display: 'flex' }}>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto'
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar sizes="large" alt={user.name} src={user.picture} />
                <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Email: {user.email}
                </Typography>
                <Typography variant="subtitle1">
                  Type: {user.AdminType == 'IsAdmin' ? 'Admin' : 'User'}
                </Typography>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
      )
  )
}

export default ProfilePage
