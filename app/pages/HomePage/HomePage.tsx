import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import Slider from "react-slick";
import Carousel from 'nuka-carousel';
import Palette, {usePalette} from 'react-palette';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

import { RatingBar, SearchInput } from '../../components/common/atoms';
import { BookInfoCard, ProgressionCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { Colors, Sizing, Typography } from '../../styles';
import { mockBooks, Book } from '../../utils/mock-books';
import { currentUser, User } from '../../utils/mock-users';
import { Author } from '../../utils/mock-authors';
import { Genre } from '../../utils/mock-genres';
import styles from './HomePage.css';

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

const HomePage = (props) => {
  const _mockBooks = mockBooks.slice(0, 12);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [carouselSlidesToScroll, setCarouselSlidesToScroll] = useState(3);
  // const { data, loading, error } = usePalette("https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1466865542l/18144590._SY475_.jpg")

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
            {/* RECOMMENDED SECTION */}
            <BookListSection
              sectionTitle="You Might Like"
              buttonLabel="View All"
              wrapperStyle={{ padding: "0 40px", minWidth: "0" }}
              headerContainerStyle={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.15rem",
                fontWeight: "bold",
                padding: "15px 20px"
              }}
              buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
            >
              <Carousel
                slidesToShow={3}
                slidesToScroll={carouselSlidesToScroll}
                cellSpacing={30}
                framePadding="0 30px"
                slideWidth="436px"
                defaultControlsConfig={{
                  nextButtonText: '›',
                  prevButtonText: '‹',
                  nextButtonStyle: {
                    width: "34px",
                    height: "34px",
                    lineHeight: "0",
                    borderRadius: "100%",
                    transform: "translateX(16px)"
                  },
                  prevButtonStyle: {
                    width: "34px",
                    height: "34px",
                    lineHeight: "0",
                    borderRadius: "100%",
                    transform: "translateX(-16px)"
                  },
                  pagingDotsStyle: { display: "none" }
                }}
              >
                {
                  mockBooks.map((book: Book, index: number) => (
                    <div>
                      <BookInfoCard
                        title={book.title}
                        cover={book.cover}
                        authors={book.authors ? `by ${book.authors[0].name}` : ""}
                        smartBackgroundColor={true}
                        bookTitleStyle={{
                          color: Colors.WHITE,
                          textShadow: "0px 0px 10px #000000",
                          fontSize: "1.25rem"
                        }}
                        bookAuthorsStyle={{
                          color: Colors.WHITE,
                          textShadow: "0px 0px 10px #000000",
                          fontSize: "1rem"
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: "flex-end",
                            paddingRight: "30%"
                          }}
                        >
                          <RatingBar
                            ratingValue={book.ratingValue ? book.ratingValue / 5 : 0}
                            starStyle={{ color: Colors.WHITE }}
                          />
                        </div>
                      </BookInfoCard>
                    </div>
                  ))
                }
              </Carousel>
            </BookListSection>

            {/* POPULAR SECTION */}
            <BookListSection
              sectionTitle="Popular Books"
              buttonLabel="View All"
              wrapperStyle={{ padding: "0 40px" }}
              headerContainerStyle={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.15rem",
                fontWeight: "bold",
                padding: "15px 20px"
              }}
              buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
            >
              <BookList
                books={_mockBooks}
                wrapperStyle={{
                  justifyContent: 'space-between',
                  backgroundColor: Colors.WHITE,
                  borderRadius: "20px",
                  padding: "10px"
                }}
                bookContainerStyle={{ width: "290px", margin: "5px", fontSize: "0.85rem" }}
                bookProps={{ bookTitleStyle: { fontSize: "1rem" } }}
              />
            </BookListSection>
          </Scrollbars>
        </div>
      </div>

      {/* RIGHT DRAWER */}
      {/* <div
          style={{
            width: `${Sizing.HOMEPAGE_DRAWER_TOGGLE_WIDTH}px`,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0
          }}
        >
          <IconButton onClick={handleDrawerClick}>
            <AccessibleForwardIcon className={classes.icon}/>
          </IconButton>
        </div> */}
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

export default HomePage;
