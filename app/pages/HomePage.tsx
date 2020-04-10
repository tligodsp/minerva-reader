import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

import { RatingBar } from '../components/common/atoms';
import { BookInfoCard } from '../components/common/molecules';
import { BookList } from '../components/common/organisms';
import { Colors, Sizing } from '../styles';
import { mockBooks, Book } from '../utils/mock-books';
import { Author } from '../utils/mock-authors';
import { Genre } from '../utils/mock-genres';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      border: "none"
    },
    icon: {
      fontSize: Sizing.NAVBAR_ICON_SIZE,
    },
    content: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);

const HomePage = (props) => {
  const _mockBooks = mockBooks.slice(0, 12);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "EEEEEE",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <div
        style={{ flex: 1, display: "flex", flexDirection: "row" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <BookList
          books={_mockBooks}
          wrapperStyle={{ padding: "0 30px", justifyContent: "space-between" }}
        />
        <div
          style={{
            width: "80px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconButton onClick={handleDrawerClick}>
            <AccessibleForwardIcon className={classes.icon}/>
          </IconButton>
        </div>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>Alo alo</div>
      </Drawer>
    </div>
  );
}

export default HomePage;
