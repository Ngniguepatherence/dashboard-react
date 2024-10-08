import NextLink from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useAuthContext } from '../../contexts/auth-context';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { user } = useAuthContext();
  const userRoles = user ? user.role : [];

  const filteredItems = items(userRoles); 
  // console.log(filteredItems);
  const [submenuOpen, setSubmenuOpen] = useState({});
  
  const handleItemClick = (index) => {
    const item = filteredItems[index];
    if (item.children && item.children.length > 0) {
      // Si l'élément du menu a un sous-menu, déplier ou replier le sous-menu
      setSubmenuOpen({
        ...submenuOpen,
        [item.title]: !submenuOpen[item.title]
      });
    } else {
      // Sinon, rediriger l'utilisateur vers la page associée à cet élément du menu
      // Par exemple, en utilisant Next.js router
      window.location.href = item.path;
    }
  };

  const handleMouseEnter = (title) => {
    setSubmenuOpen({
      ...submenuOpen,
      [title]: true
    });
  }

  const handleMouseLeave = (title) => {
    setSubmenuOpen({
      ...submenuOpen,
      [title]: false
    });
  }

  const renderSubMenu = (options) => {
    return options.map((option, index) => (
      <React.Fragment key={index}>
        <SideNavItem
          key={option.title}
          active={pathname === option.path}
          path={option.path}
          title={option.title}
        />
        {option.options && (
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {renderSubMenu(option.options)}
          </Stack>
        )}
      </React.Fragment>
    ));
  };

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Association
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                RT08 IUT-FV
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          
          >
            {filteredItems.map((item,index) => {
              const active = item.path ? (pathname === item.path) : false;
              const hasSubmenu = item.children && item.children.length > 0;
              
              return (
                <React.Fragment key={index}>
                  <li 
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  // onMouseLeave={() => handleMouseLeave(item.title)}
                  >
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                  hasSubmenu={hasSubmenu}
                  
                />

              </li>

                {hasSubmenu && submenuOpen[item.title] && (
                    <Stack
                      component="ul"
                      spacing={0.5}
                      sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0
                      }}
                      onMouseEnter={() => handleMouseEnter(item.title)}
                      onMouseLeave={() => handleMouseLeave(item.title)}
                    >
                      {renderSubMenu(item.children)}
                    </Stack>
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
