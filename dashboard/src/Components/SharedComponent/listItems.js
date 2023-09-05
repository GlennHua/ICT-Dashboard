import * as React from 'react';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { ListItemButton } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Collapse,List} from '@mui/material';
/**
 * The list content on the navigation bar on the left side of the each web page.
 */


export default function MainListItems (){
  const [open,setOpen] = useState(false);

  const handleClick=()=>{
    setOpen(!open);
  } 

  return(
    <div>
      <ListItem button component={Link} href="/">
        <Tooltip title="Dashboard" placement="right">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button component={Link} href="/ViewCourses">
        <Tooltip title="View Courses" placement="right">
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="View Courses" />
      </ListItem>

      <ListItemButton onClick={handleClick}  > 
            <Tooltip title="Reports" placement="right">
              <ListItemIcon>
              <BarChartIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Reports" />
            {open?<ExpandLess/>:<ExpandMore/>}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} component={Link} href="/Reports">
            <ListItemIcon>
                  
            </ListItemIcon>
            <ListItemText primary="Department Report" />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} component={Link} href="/StudentReport">
            <ListItemIcon>
              
            </ListItemIcon>
            <ListItemText primary="Student Report" />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} component={Link} href="/StudentPerformance">
      
            <ListItemIcon>
              
            </ListItemIcon>
 
            <ListItemText primary="Student Performance" />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} component={Link} href="/InternshipDetails">
            <ListItemIcon>
                    
            </ListItemIcon>
            <ListItemText primary="Internship Report" />
          </ListItemButton>
        </List>
        
      </Collapse>

      <ListItem button component={Link} href="/importCSV">
        <Tooltip title="Import CSV" placement="right">
          <ListItemIcon>
            <ImportExportIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Import CSV" />
      </ListItem>
  </div>
  )
};

