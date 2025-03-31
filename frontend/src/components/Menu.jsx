
import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuItem as BaseMenuItem } from '@mui/base/MenuItem';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import Avatar from '@mui/material/Avatar';
import './Menu.css'; // Import the external CSS file
import { handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

export default function MenuSimple({loggedInUser }) {
  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('redirectAfterLogin');
    localStorage.removeItem('loginUser');
    handleSuccess("Log-Out Successful!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleProfileSettings=async()=>{
  

  };

  return (
    <Dropdown  >
      <BaseMenuButton className="menu-button">
        <Avatar alt="User Avatar" src={loggedInUser.profileImage} />
      </BaseMenuButton>
      <Menu slots={{ listbox: 'ul' }} className="menu-list">
        <BaseMenuItem className="menu-item" onClick={createHandleMenuClick('Profile')}>
          Profile settings
        </BaseMenuItem>
        <BaseMenuItem className="menu-item" onClick={handleProfileSettings}>
          My Rentals
        </BaseMenuItem>
        <BaseMenuItem className="menu-item" onClick={handleProfileSettings}>
          About Us
        </BaseMenuItem>
        <BaseMenuItem className="menu-item" onClick={handleLogout}>
          Log out
        </BaseMenuItem>
      </Menu>
    </Dropdown>
  );
}
