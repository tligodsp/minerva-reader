import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { BookList } from '../';
import { ProgressionCard } from '../../molecules';
import { Sizing, Typography } from '../../../../styles';
import MTheme from '../../../../styles/themes';
import defaultStyles from './LibraryPageRightDrawer.css';

const drawerWidth = Sizing.HOMEPAGE_DRAWER_WIDTH;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      border: "none",
      fontFamily: Typography.FONT_FAMILY,
      backgroundColor: MTheme.light.backgroundColor
    },
    drawerPaperDark: {
      width: drawerWidth,
      border: "none",
      fontFamily: Typography.FONT_FAMILY,
      backgroundColor: MTheme.dark.backgroundColor
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      border: "1px solid #bbb"
    },
  }),
);

const DrawerSection = (props) => {
  return (
    <div className={defaultStyles['section']}>
      <div className={defaultStyles['header']}>
        <div style={{ color: props.headerColor }}>{props.headerText}</div>
        <div className={defaultStyles['view-all']}>{props.headerClickableText}</div>
      </div>
      {props.children}
    </div>
  );
}

const LibraryPageRightDrawer = (props) => {
  const _currentUser = props.users.currentUser;
  const { theme } = props.local;
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer + " " + defaultStyles['right-drawer']}
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      classes={{
        paper: theme.name == 'light' ? classes.drawerPaper : classes.drawerPaperDark,
      }}
    >
      <div className={defaultStyles['content']}>
        <div className={defaultStyles['avatar-container']}>
          <div className={defaultStyles['avatar-and-name']}>
            <Avatar
              alt="Profile Picture"
              src={_currentUser.profilePicture}
              className={classes.avatarLarge}
            />
            <div style={{
              marginLeft: '10px',
              color: theme.textColor
            }}>{_currentUser.username}</div>
          </div>
        </div>
        <Divider style={{ margin: "10px 0" }}/>
        {/* {
          _currentUser.recentlyRead &&
          <DrawerSection
            headerText="Recently Read"
            headerClickableText="View All"
          >
            <BookList
              books={_currentUser.recentlyRead.slice(0, 1)}
              wrapperStyle={{ }}
              bookContainerStyle={{ width: `${Sizing.HOMEPAGE_DRAWER_WIDTH - 60}px`, margin: "5px" }}
              bookProps={{
                wrapperStyle: { backgroundColor: "#ECECEC" }
              }}
              useProgressForSubInfo={true}
              useProgressForChildren={true}
            />
          </DrawerSection>
        } */}
        {
          _currentUser.wishlist &&
          <DrawerSection
            headerText="Your Wishlist"
            headerColor={theme.textColor}
            // headerClickableText="View All"
          >
            <BookList
              books={_currentUser.wishlist.slice(0, 3)}
              wrapperStyle={{ }}
              bookContainerStyle={{ width: `${Sizing.HOMEPAGE_DRAWER_WIDTH - 60}px`, margin: "10px 5px" }}
              bookProps={{
                bookTitleStyle: { fontSize: "1rem", color: theme.bookTitleColor },
                bookAuthorsStyle: { fontWeight: 500, color: theme.bookAuthorsColor },
                wrapperStyle: { backgroundColor: theme.bookCardBGColor },
              }}
              starColor={theme.starColor}
              showBookRatingCount
            />
          </DrawerSection>

        }
        {/* <DrawerSection
          headerText="Daily Goal"
          headerClickableText="Setting"
        >
          <ProgressionCard
            goal={60}
            progress={25}
            wrapperStyles={{
              width: `${Sizing.HOMEPAGE_DRAWER_WIDTH - 60}px`,
              background: 'linear-gradient(202.86deg, #7670FF 47.99%, rgba(196, 196, 196, 0) 223.45%, #8B82FF 223.45%)'
            }}
          >
            <img
              className={defaultStyles['progress-circle-img']}
              src='https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/book-icon-png-5-tr.png?alt=media&token=929e8164-b77d-47d8-8403-c6d7a028a89e'
              alt='Book'
            />
          </ProgressionCard>
        </DrawerSection> */}
      </div>
    </Drawer>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
  local: state.local,
});

export default connect(mapStateToProps)(LibraryPageRightDrawer);
