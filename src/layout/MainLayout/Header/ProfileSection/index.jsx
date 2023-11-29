import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useAuthenticationStore } from '~/hooks/authentication';
import { useCustomizationStore } from '~/hooks/customization';

// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party

// project imports
import User1 from '~/assets/images/users/user-round.svg';
import MainCard from '~/ui-component/cards/MainCard';
import Transitions from '~/ui-component/extended/Transitions';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';

const selectedIndex = -1;

const ProfileSection = () => {
  const theme = useTheme();
  const { customizationState } = useCustomizationStore();
  const { authenticationState, dispatchLogout } = useAuthenticationStore();
  const { t } = useTranslation();

  // const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const prevOpen = useRef(open);
  const anchorRef = useRef(null);

  const handleLogout = useCallback(() => {
    dispatchLogout();
  }, [dispatchLogout]);

  const handleClose = useCallback((event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }, []);

  // const handleListItemClick = useCallback(
  //   (event, index, route = '') => {
  //     setSelectedIndex(index);
  //     handleClose(event);

  //     if (route && route !== '') {
  //       navigate(route);
  //     }
  //   },
  //   [handleClose, navigate]
  // );
  // console.log(handleListItemClick);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="h4">Good Morning,</Typography>
                      <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                        {authenticationState.loginInfo.name}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5
                        }
                      }}
                    >
                      <ListItemButton
                        sx={{ borderRadius: `${customizationState.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">{t('profile.logout')}</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default memo(ProfileSection);
