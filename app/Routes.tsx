import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import { Sizing } from './styles';

import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import BookInfoPage from './pages/BookInfoPage/BookInfoPage';
import LocalLibraryPage from './pages/LocalLibraryPage/LocalLibraryPage';
// import ReaderPage from './pages/ReaderPage';
import ReaderPage from './pages/ReaderPage/ReaderPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import AboutPage from './pages/AboutPage';

const styles: React.CSSProperties = {
  fontSize: Sizing.NAVBAR_ICON_SIZE,
  opacity: 1
}

export const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    isOnNavBar: true,
    icon: <HomeOutlinedIcon style={styles}/>,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchResultsPage,
    isOnNavBar: false,
  },
  {
    path: '/book-info/:id',
    name: 'BookInfo',
    component: BookInfoPage,
    isOnNavBar: false,
  },
  {
    path: '/local-library',
    name: 'LocalLibrary',
    component: LocalLibraryPage,
    isOnNavBar: true,
    icon: <ImportContactsOutlinedIcon style={styles}/>,
  },
  {
    path: '/reader/:id',
    name: 'Reader',
    component: ReaderPage,
    isOnNavBar: false,
  },
  {
    path: '/settings',
    name: 'Setting',
    component: SettingsPage,
    isOnNavBar: true,
    icon: <SettingsOutlinedIcon style={styles}/>,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    isOnNavBar: true,
    icon: <HelpOutlineOutlinedIcon style={styles}/>,
  },
];
