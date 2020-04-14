import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import Slider from "react-slick";
import Carousel from 'nuka-carousel';
import Palette, {usePalette} from 'react-palette';

import { RatingBar } from '../../components/common/atoms';
import { BookInfoCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { Colors, Sizing } from '../../styles';
import { mockBooks, Book } from '../../utils/mock-books';
import { Author } from '../../utils/mock-authors';
import { Genre } from '../../utils/mock-genres';

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

  const settings = {
    className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 2,
      speed: 500,
      variableWidth: true
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#EEEEEE",
        display: "flex",
        flexDirection: "row",
        minWidth: "0"
      }}
    >
      <div
        style={{ flex: 1, display: "flex", flexDirection: "row", minWidth: "0" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>

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
              framePadding="0 34px"
              slideWidth="420px"
              defaultControlsConfig={{
                nextButtonText: '›',
                prevButtonText: '‹',
                nextButtonStyle: {
                  width: "40px",
                  height: "40px",
                  lineHeight: "0",
                  borderRadius: "100%",
                  transform: "translateX(16px)"
                },
                prevButtonStyle: {
                  width: "40px",
                  height: "40px",
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
                // mockBooks.map((book: Book, index: number) => (
                //   <Palette src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1466865542l/18144590._SY475_.jpg">
                //     {({ data, loading, error }) => (
                //       <BookInfoCard
                //         title={book.title}
                //         cover={book.cover}
                //         wrapperStyle={{ backgroundColor: data.vibrant }}
                //       />
                //     )}
                //   </Palette>
                // ))
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
        </div>
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
