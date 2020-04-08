import React from 'react';

import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

export const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    isOnNavBar: true,
    icon: <HomeOutlinedIcon style={{ fontSize: '2rem' }}/>,
  },
  {
    path: '/reader',
    name: 'Reader',
    component: ReaderPage,
    isOnNavBar: true,
    icon: <ImportContactsOutlinedIcon style={{ fontSize: '2rem' }}/>,
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage,
    isOnNavBar: true,
    icon: <SettingsOutlinedIcon style={{ fontSize: '2rem' }}/>,
  },
];
