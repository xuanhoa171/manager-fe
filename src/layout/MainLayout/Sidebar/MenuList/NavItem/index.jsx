import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material-ui
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useCustomizationStore } from '~/hooks/customization';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const NavItem = ({ item, level }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { customizationState, dispatchSetMenu, dispatchMenuOpen } = useCustomizationStore();
  const { pathname } = useLocation();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = useMemo(() => {
    return item.icon;
  }, [item.icon]);

  const itemIcon = useMemo(() => {
    return item?.icon ? (
      <Icon stroke={1.5} size="1.3rem" />
    ) : (
      <FiberManualRecordIcon
        sx={{
          width: customizationState?.isOpen?.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
          height: customizationState?.isOpen?.findIndex((id) => id === item?.id) > -1 ? 8 : 6
        }}
        fontSize={level > 0 ? 'inherit' : 'medium'}
      />
    );
  }, [customizationState?.isOpen, item?.icon, item?.id, level]);

  const itemTarget = useMemo(() => {
    if (item.target) return '_blank';
    else return '_self';
  }, [item.target]);

  const listItemProps = useMemo(() => {
    if (item?.external) {
      return { component: 'a', href: item.url, target: itemTarget };
    } else {
      return {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
      };
    }
  }, [item?.external, item.url, itemTarget]);

  const itemHandler = useCallback(
    (id) => {
      dispatchMenuOpen(id);
      if (matchesSM) dispatchSetMenu(false);
    },
    [dispatchMenuOpen, dispatchSetMenu, matchesSM]
  );

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatchMenuOpen(item.id);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customizationState?.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      }}
      selected={customizationState?.isOpen?.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={customizationState?.isOpen?.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {t(`${item.title}`)}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {t(`${item.caption}`)}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default memo(NavItem);
