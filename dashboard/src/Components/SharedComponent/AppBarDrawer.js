import { styled, createTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { colors } from '@mui/material';

//Set the top blue app bar style
//The name MuiAppBar can be used when providing default props or style overrides in the theme.

/*
  ==, When the two sides have different types of values, type conversion is done before comparison.

  ===, no type conversion is done, and those with different types must not be equal.
 */

//set left navigation bar - Drawer()

const drawerWidth = 240;
  
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position: 'relative',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  },),
  ...(open && {
    position: 'relative',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export const tableTheme = createTheme({
 components:{
    MuiTableCell:{
      defaultProps:{
        sx:{bgcolor:"#42a5f5"}
      }
  } 
 }
})

export const courseTabelTheme = createTheme({
  components:{
    MuiTableCell:{
      defaultProps:{
        sx:{bgcolor:"#90caf9"}
      }
  } 
 }
})

export const mdTheme = createTheme();