import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import {USER_IS_ADMIN, USER_IS_USER, USER_HAS_NO_ROLE, INVALID_USER} from "../..//constants/rolesConstants";

const Profile = () => {
  const { user,isAuthenticated, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkUserRoleType = () => {
    if(user){
      if(user.AdminType.length > 0){
        if(user.AdminType.find(role => role === "IsAdmin")){
          setRole(USER_IS_ADMIN)
        } else if(user.AdminType.find(role => role === "IsUser")){
          setRole(USER_IS_USER)
        }

        // user.AdminType.find(role => role === "IsAdmin" && setRole(USER_IS_ADMIN))
        // user.AdminType.find(role => role === "IsUser" && setRole(USER_IS_USER))

      } else{
        setRole(USER_HAS_NO_ROLE)
      }
    } else{
      setRole(INVALID_USER)
    }
  }

  React.useEffect(() => {
    checkUserRoleType();
  }, [role]);
  
  return(
    isAuthenticated && (
      <div data-testid='user-menu'>
        <Button
          id="basic-button"
          data-testid='profile-btn'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar alt={user?.name} src={user?.picture} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem component={Link} to="/Profile" >Profile</MenuItem>
          <MenuItem onClick={()=>logout()} data-testid='logout-btn'>Logout</MenuItem>
          {
            role === USER_IS_ADMIN ? <MenuItem onClick={handleClose} data-testid='admin-mode'>Enter Admin Mode</MenuItem> :
            {
              INVALID_USER: <MenuItem onClick={handleClose} data-testid='unautherize-mode'>Invalid user</MenuItem>,
              USER_HAS_NO_ROLE: <MenuItem onClick={handleClose} data-testid='no-role-mode'>Please contact administrators for permissions</MenuItem>,
              USER_IS_USER: <MenuItem onClick={handleClose} data-testid='normal-user-mode'>Welcome, {user.given_name} </MenuItem>
            }[role]
          }
          
        </Menu>
      </div>
        //     <ul>
        //         {Object.keys(user).map((objKey, index) => <li key={index}>{objKey}: {user[objKey]}</li>)}
        //     </ul>
    )
  )
};

export default Profile;