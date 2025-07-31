import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router';
import { UrlPath } from '@enums';
import { useAppSelector, useToastErrorHandler } from '@hooks';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'store/userSlice';
import { useToastContext } from 'context/ToastContext';
import { rootRequest } from 'utils/request/rootRequest';

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleError = useToastErrorHandler();
  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pushToast } = useToastContext();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path: UrlPath) => {
    setAnchorElNav(null);
    navigate(path);
  };

  const logoutUser = async () => {
    try {
      await rootRequest.logout();
      dispatch(deleteUser());
      pushToast({ type: 'info', message: "You've logged out successfully. See you soon!" });
    } catch (error) {
      handleError(error);
    }
  };

  const pages = [
    { name: 'Registration', path: UrlPath.REGISTRATION, viewForAuth: false },
    { name: 'Log in', path: UrlPath.SIGN_IN, viewForAuth: false },
    { name: 'main', path: UrlPath.HOME, viewForAuth: true },
    { name: 'users', path: UrlPath.USERS, viewForAuth: true },
    { name: 'about', path: UrlPath.ABOUT, viewForAuth: true },
    { name: 'questions', path: UrlPath.QUESTIONS, viewForAuth: true },
  ];

  const settings = [
    { title: 'Account', path: UrlPath.ACCOUNT, handleClick: null },
    { title: 'Logout', path: null, handleClick: logoutUser },
  ];

  const handleCloseUserMenu = async (setting: (typeof settings)[0]) => {
    setAnchorElUser(null);
    if (setting.handleClick) await setting.handleClick();
    if (setting.path) navigate(setting.path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Innowise/Codeland
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => {
                if (isAuth && page.viewForAuth) {
                  return (
                    <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                      <Typography component={NavLink} to={page.path} sx={{ textAlign: 'center' }}>
                        {page.name.toUpperCase()}
                      </Typography>
                    </MenuItem>
                  );
                } else {
                  if (!isAuth) {
                    return (
                      <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                        <Typography component={NavLink} to={page.path} sx={{ textAlign: 'center' }}>
                          {page.name.toUpperCase()}
                        </Typography>
                      </MenuItem>
                    );
                  }
                }
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => {
              if (isAuth && page.viewForAuth) {
                return (
                  <Typography
                    component={NavLink}
                    to={page.path}
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name.toUpperCase()}
                  </Typography>
                );
              } else {
                if (!isAuth)
                  return (
                    <Typography
                      component={NavLink}
                      to={page.path}
                      key={page.name}
                      onClick={() => handleCloseNavMenu(page.path)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name.toUpperCase()}
                    </Typography>
                  );
              }
            })}
          </Box>
          {isAuth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
