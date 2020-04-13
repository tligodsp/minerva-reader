import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import { Sizing } from './styles';

import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage/HomePage';
import ReaderPage from './pages/ReaderPage';
import AboutPage from './pages/AboutPage';

export const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    isOnNavBar: true,
    icon: <HomeOutlinedIcon style={{ fontSize: Sizing.NAVBAR_ICON_SIZE }}/>,
  },
  {
    path: '/reader',
    name: 'Reader',
    component: ReaderPage,
    isOnNavBar: true,
    icon: <ImportContactsOutlinedIcon style={{ fontSize: Sizing.NAVBAR_ICON_SIZE }}/>,
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage,
    isOnNavBar: true,
    icon: <SettingsOutlinedIcon style={{ fontSize: Sizing.NAVBAR_ICON_SIZE }}/>,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    isOnNavBar: true,
    icon: <HelpOutlineOutlinedIcon style={{ fontSize: Sizing.NAVBAR_ICON_SIZE }}/>,
  },
];
