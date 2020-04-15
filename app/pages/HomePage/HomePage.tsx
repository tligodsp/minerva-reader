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


import { RatingBar } from '../../components/common/atoms';
import { BookInfoCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { Colors, Sizing } from '../../styles';
import { mockBooks, Book } from '../../utils/mock-books';
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
      marginRight: -drawerWidth + Sizing.HOMEPAGE_DRAWER_TOGGLE_WIDTH,
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
        flexDirection: "row",
        minWidth: "0",
        position: "relative"
      }}
    >
      <div
        style={{ flex: 1, display: "flex", flexDirection: "row", minWidth: "0" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
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

            <BookListSection
              sectionTitle="You Might Like"
              buttonLabel="View All"
              wrapperStyle={{ padding: "0 30px", minWidth: "0" }}
              headerContainerStyle={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.15rem",
                fontWeight: "bold",
                padding: "15px 20px"
              }}
              buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
            >
              {/* <Slider {...settings}>
                {
                  mockBooks.map((book: Book, index: number) => (
                    <div style={{ margin: "10px", width: "500px" }}>
                      <BookInfoCard
                        title={book.title}
                        cover={book.cover}
                      />
                    </div>
                  ))
                }
              </Slider> */}
              <Carousel
                slidesToShow={3}
                slidesToScroll={carouselSlidesToScroll}
                cellSpacing={20}
                framePadding="0 30px"
                slideWidth="416px"
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
            <BookListSection
              sectionTitle="Popular Books"
              buttonLabel="View All"
              wrapperStyle={{ padding: "0 30px" }}
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
                wrapperStyle={{ justifyContent: "space-evenly" }}
                bookContainerStyle={{ width: "290px", margin: "5px" }}
              />
            </BookListSection>
          </Scrollbars>
        </div>
        {/* <div
          className={styles['right-drawer-toggle']}
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
        </div> */}
      </div>
      <div
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
        <div style={{ display: "flex", flexDirection: "column", padding: "20px"}}>
          <div onClick={handleDrawerClick}>Close</div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>Recently Read</div>
            <div>View All</div>
          </div>
          <BookList
              books={_mockBooks.slice(0, 2)}
              wrapperStyle={{ }}
              bookContainerStyle={{ width: `${Sizing.HOMEPAGE_DRAWER_WIDTH - 40}px`, margin: "5px" }}
              bookProps={{
                wrapperStyle: { backgroundColor: "#ECECEC" }
              }}
            />
        </div>
      </Drawer>
    </div>
  );
}

export default HomePage;
