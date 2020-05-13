import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, useParams } from 'react-router-dom';

import { SearchInput } from '../../components/common/atoms';
import { ProgressionCard, FilterCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { Colors, Sizing, Typography } from '../../styles';
import { mockBooks } from '../../utils/mock-books';
import { mockGenres } from '../../utils/mock-genres';
import { mockAuthors } from '../../utils/mock-authors';
import { currentUser} from '../../utils/mock-users';
import styles from './BookInfoPage.css';

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
    },
    icon: {
      fontSize: Sizing.NAVBAR_ICON_SIZE,
    },
    iconButton: {
      // padding: 10,
      fontSize: "2rem"
    },
    content: {
      // marginRight: Sizing.HOMEPAGE_DRAWER_TOGGLE_WIDTH,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: -drawerWidth + Sizing.HOMEPAGE_DRAWER_TOGGLE_WIDTH,
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      border: "1px solid #bbb"
    },
    progressionCard: {
      width: Sizing.HOMEPAGE_DRAWER_WIDTH - 60,
      backgroundColor: 'red'
    }
  }),
);

const DrawerSection = (props) => {
  return (
    <div className={styles['section']}>
      <div className={styles['header']}>
        <div>{props.headerText}</div>
        <div className={styles['view-all']}>{props.headerClickableText}</div>
      </div>
      {props.children}
    </div>
  );
}

const BookInfoPage = (props) => {
  const _mockBooks = mockBooks.slice(0, 12);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [carouselSlidesToScroll, setCarouselSlidesToScroll] = useState(3);
  // const { data, loading, error } = usePalette("https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1466865542l/18144590._SY475_.jpg")
  let { id } = useParams();

  const handleDrawerClick = () => {
    setOpen(!open);
    // setCarouselSlidesToShow(open ? 2 : 3);
  };

  useEffect(() => {
    setCarouselSlidesToScroll(open ? 2 : 3);
  }, [
    open
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        position: "relative"
      }}
    >
      {/* PAGE CONTENT */}
      <div
        style={{ flex: 1, display: "flex", flexDirection: "row", minWidth: "0" }}
        className={classes.content}
      >
        <div style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          position: "relative"
         }}>
          <Scrollbars style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "0",
            boxSizing: "content-box",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: "-17px"
          }}>
            {/* SEARCH BAR */}
            <div className={styles['search-bar-container']}>
              <SearchInput />
              <div className={styles['menu-button-container']}>
                <IconButton className={classes.iconButton} onClick={handleDrawerClick}>
                  <MenuIcon />
                </IconButton>
              </div>
            </div>

            <div className={styles['page-content']}>
              {/* LEFT SECTION */}
              <div className={styles['left-section']}></div>
              {/* RIGHT SECTION */}
              <div className={styles['right-section']}></div>
            </div>
          </Scrollbars>
        </div>
      </div>
      <Drawer
        className={classes.drawer + " " + styles['right-drawer']}
        anchor="right"
        open={open}
        onClose={() => {setOpen(false)}}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={styles['content']}>
          <div className={styles['avatar-container']}>
            <div className={styles['avatar-and-name']}>
              <Avatar
                alt="Profile Picture"
                src={currentUser.profilePicture}
                className={classes.avatarLarge}
              />
              <div style={{ marginLeft: '10px' }}>{currentUser.displayName}</div>
            </div>
          </div>
          <Divider style={{ margin: "10px 0" }}/>
          {
            currentUser.recentlyRead &&
            <DrawerSection
              headerText="Recently Read"
              headerClickableText="View All"
            >
              <BookList
                books={currentUser.recentlyRead.slice(0, 1)}
                wrapperStyle={{ }}
                bookContainerStyle={{ width: `${Sizing.HOMEPAGE_DRAWER_WIDTH - 60}px`, margin: "5px" }}
                bookProps={{
                  wrapperStyle: { backgroundColor: "#ECECEC" }
                }}
                useProgressForSubInfo={true}
                useProgressForChildren={true}
              />
            </DrawerSection>
          }
          {
            currentUser.wishlist &&
            <DrawerSection
              headerText="Want To Read"
              headerClickableText="View All"
            >
              <BookList
                books={currentUser.wishlist.slice(0, 1)}
                wrapperStyle={{ }}
                bookContainerStyle={{ width: `${Sizing.HOMEPAGE_DRAWER_WIDTH - 60}px`, margin: "5px" }}
                bookProps={{
                  wrapperStyle: { backgroundColor: "#ECECEC" }
                }}
              />
            </DrawerSection>

          }
          <DrawerSection
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
                className={styles['progress-circle-img']}
                src='https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/book-icon-png-5-tr.png?alt=media&token=929e8164-b77d-47d8-8403-c6d7a028a89e'
                alt='Book'
              />
            </ProgressionCard>
          </DrawerSection>
        </div>
      </Drawer>
    </div>
  );
}

export default BookInfoPage;
