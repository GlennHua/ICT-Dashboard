import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import MainListItems from './listItems';
import Breadcrumbs from './Breadcrumb';
import { AppBar, Drawer } from './AppBarDrawer';
import { useState, useEffect } from "react";
import axios from 'axios';

import LoginButton from '../Login/LoginButton';
import Profile from '../Login/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

/**
 * Function for Drawer and AppBar which located on the left and top of the page
 * 
 * @param {string} pageTitle Page title display on the top of the page  
 * @return {Box} Display the Drawer and AppBar.
 */


export function Bar() {
  const {isLoading, error,logout} = useAuth0();
  const [open, setOpen] = React.useState(true);
  const [count, setCount] = useState(0);
  const [listOpen, setListOpen] = useState(false); 
  const [notificationsData, setNotificationsData] = useState('');
  const [notificationList, setNotificationList] = useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const location = useLocation();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/dashboard/notifications');
        setNotificationsData(response.data);
      } catch {
      }
    }
    fetchData();
  }, [count])

  useEffect(() => {

    // console.log("data:", notificationsData);
    let currentNotification = [];
    let number = 0;
    for (let i = 0; i < notificationsData.length; i++) {
      currentNotification[i] = notificationsData[i].date+' - '+notificationsData[i].content;
      if (notificationsData[i].status == false) {
        number++;
      }
    }

    setCount(number);

    // console.log("number", number);
    // console.log("count", count);
    setNotificationList(currentNotification);
    setListOpen(true);

  }, [notificationsData])

  useEffect(() => {
    if(error){
      alert(error.message)
      logout()
    }
  }, [error])

  return (
    <Box>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid item xs container direction="column" spacing={1}>
            <Breadcrumbs />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {location.pathname == '/' ? 'Dashboard' : location.pathname.slice(1)}
            </Typography>
          </Grid>
          <IconButton color="inherit" onClick={() => {
            axios.put('/api/dashboard/notifications');
            setCount(0);
            handleClickOpenDialog();
          }}>
            <Badge badgeContent={count} color="error" >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {!error && isLoading && <div>Loading...</div>}
          {!error && !isLoading && (
            <>
              <LoginButton />
              <Profile />
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Notifications"}
        </DialogTitle>
        <DialogContent>
          <List>

            {listOpen ? <div>{notificationList.map((item, index) =>
              <ListItem key={index} disablePadding>
                <ListItemText primary={item} />
              </ListItem>
            )}</div> : <div></div>}

          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer variant="permanent" open={open} sx={{position:'relative'}}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
          <List>
            <MainListItems/>
          </List>
        <Divider />
      </Drawer>
    </Box>
  );
}