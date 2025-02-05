import React from "react";
import { Drawer, List, ListItemIcon, ListItemText, Box, ListItemButton, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import './Sidebar.css';
import { Person } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteCookie } from "../../cookieFunction";
import { PointOfSale } from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = () => {

  function handleLogout() {
    deleteCookie('User');
    localStorage.clear();
  }

  const drawerContent = (
    <div>
      <List id='sidebar'
        sx={{
          backgroundColor: '#efefef',
          height: '100vh',
          position: 'fixed',
          width: drawerWidth,
          outline: 'solid 2px #e0e0e0',
        }}>
        <ListItemButton component={Link}
          to="/"
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#f0f0f0',
            },
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton component={Link}
          to="/profile"
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#f0f0f0',
            },
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profilo" />
        </ListItemButton>

        <ListItemButton component={Link}
          to="/transactions"
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#f0f0f0',
            },
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}>
          <ListItemIcon>
            <PointOfSale />
          </ListItemIcon>
          <ListItemText primary="Transazioni" />
        </ListItemButton>

        <ListItemButton component={Link}
          to="/login"
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#f0f0f0',
            },
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            color: 'red',
            position: 'absolute',
            bottom: 90,
            width: drawerWidth,
          }}
          onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div >
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
