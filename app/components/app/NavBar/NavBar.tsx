import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Colors, Sizing } from '../../../styles';
import CTheme from '../../../styles/themes';
import transitions from '@material-ui/core/styles/transitions';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: '20px 0',
    width: Sizing.NAVBAR_WIDTH,
    minWidth: Sizing.NAVBAR_WIDTH,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: Colors.PRIMARY_LIGHTER,
    borderRadius: 'unset',
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsIndicator: {
    // backgroundColor: Colors.PRIMARY_LIGHTER,
    display: 'none'
  },
  tab: {
    color: Colors.WHITE,
    opacity: 1,
    margin: '10px 0',
    borderRadius: '10px',
    width: `${Sizing.NAVBAR_WIDTH - 30}px`,
    height: `${Sizing.NAVBAR_WIDTH - 30}px`,
    minWidth: Sizing.NAVBAR_WIDTH,
    transition: '0.2s ease-in',
    '@media (min-width: 600px)': {
      minWidth: `${Sizing.NAVBAR_WIDTH - 30}px`
    }
  },
  tabSelected: {
    // color: Colors.PRIMARY_LIGHTER,
    color: CTheme.light.navBarBGColor,
    backgroundColor: Colors.WHITE
  },
  tabSelectedDark: {
    color: CTheme.dark.navBarBGColor,
    backgroundColor: Colors.WHITE
  },
  icon: {
    fontSize: Sizing.NAVBAR_ICON_SIZE,
    color: Colors.WHITE
  }
}));

const NavBar = (props: any) => {
  const classes = useStyles();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(
    location && location.pathname
    ? location.pathname
    : '/home');
  const [ tabValue, setTabValue ] = useState<any>(false);
  const { routes } = props;
  var history = useHistory();
  const { theme } = props.local;
  // console.log(theme);

  const renderNavItems = (routes: any) => {
    const classes = useStyles();
    var filteredRoutes = routes.filter(({ isOnNavBar }) => isOnNavBar);
    return filteredRoutes.map(({ path, name, icon }, index: number) =>
      <Tab
        key={'nav-item-' + index}
        classes={{
          root: classes.tab,
          selected: theme.name == 'light' ? classes.tabSelected : classes.tabSelectedDark,
        }}
        icon={icon}
        aria-label={name.toLowerCase()}
        value={path}
      />
    )
  }

	const handleChange = (event: React.ChangeEvent<{}>, newPath: string) => {
    console.log('push');
    console.log(currentPath);
    console.log(newPath);
    setCurrentPath(newPath);
    history.push(newPath);
  };

  useEffect(() => {
    history.push(currentPath);
    // console.log(currentPath);
  }, [currentPath]);

  useEffect(() => {
    console.log('changed');
    const filteredRoutes = routes.filter(({ isOnNavBar }) => isOnNavBar);
    const pathsShowOnNavBar = filteredRoutes.map(route => route.path);
    const curPathIndexInPathsShow = pathsShowOnNavBar.findIndex(path => path == location.pathname);
    if (curPathIndexInPathsShow == -1) {
      setTabValue(false);
    }
    else {
      setTabValue(location.pathname);
    }
  }, [location.pathname])

	return (
    <Paper
      id="navbar"
      className={classes.paper}
      style={{ backgroundColor: theme.navBarBGColor }}
    >
      {/* TODO: Make logo an element */}
      <img
        src={"file:///resources/logo.png"}
        alt="logo"
        style={{
          width: Sizing.NAVBAR_LOGO_SIZE,
          height: Sizing.NAVBAR_LOGO_SIZE,
          filter: 'brightness(0) invert(1)',
        }}
      />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
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

const mapStateToProps = (state) => ({
  local: state.local,
});

export default connect(mapStateToProps)(NavBar);
