import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function LogOut({ anchorEl, setAnchorEl }: { anchorEl: null | HTMLElement, setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>> }) {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem('userKey');
    navigate("/login");
  };
  
  return (
    <div className="flex">
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <img src="/assets/icons/logout.svg" className="w-6 h-6" alt="logout" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default LogOut;
