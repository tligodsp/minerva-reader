import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Colors, Sizing } from '../../../styles';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: '20px 0',
    width: Sizing.NAVBAR_WIDTH,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsIndicator: {
    backgroundColor: Colors.PRIMARY,
  },
  tab: {
    height: '70px',
    minWidth: Sizing.NAVBAR_WIDTH,
    '@media (min-width: 600px)': {
      minWidth: Sizing.NAVBAR_WIDTH
    }
  },
  tabSelected: {
    color: Colors.PRIMARY,
  },
  icon: {
    fontSize: Sizing.NAVBAR_ICON_SIZE,
  }
}));

const renderNavItems = (routes: any) => {
  const classes = useStyles();
  var filteredRoutes = routes.filter(({ isOnNavBar }) => isOnNavBar);
  return filteredRoutes.map(({ path, name, icon }, index: number) =>
    <Tab
      key={'nav-item-' + index}
      classes={{ root: classes.tab, selected: classes.tabSelected }}
      icon={icon}
      aria-label={name.toLowerCase()}
      value={path}
    />
  )
}

const NavBar = (props: any) => {
	const classes = useStyles();
  const [currentPath, setCurrentPath] = useState('/home');
  const { routes } = props;
  var history = useHistory();

	const handleChange = (event: React.ChangeEvent<{}>, newPath: string) => {
    setCurrentPath(newPath);
  };

  useEffect(() => {
    history.push(currentPath);
    console.log(currentPath);
  }, [currentPath]);

	return (
    <Paper className={classes.paper}>
      {/* TODO: Make logo an element */}
      <img
        src={"file:///resources/logo.png"}
        alt="logo"
        style={{ width: Sizing.NAVBAR_LOGO_SIZE, height: Sizing.NAVBAR_LOGO_SIZE }}
      />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={currentPath}
        onChange={handleChange}
        classes={{ root: classes.tabs, indicator: classes.tabsIndicator }}
      >
        { renderNavItems(routes) }
      </Tabs>
      <IconButton>
        <PowerSettingsNewIcon className={classes.icon}/>
      </IconButton>
    </Paper>
  );
}

export default NavBar;
