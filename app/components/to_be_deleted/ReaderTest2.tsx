import React, { Component, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import FileReaderInput from "react-file-reader-input";
import { ReactReader } from "react-reader";
import {
  Container,
  ReaderContainer,
  Bar,
  LogoWrapper,
  Logo,
  GenericButton,
  CloseIcon,
  FontSizeButton,
  ButtonWrapper
} from "./Components";

const globalAny:any = global;

const storage = globalAny.localStorage || null;

const DEMO_URL =
  "https://gerhardsletten.github.io/react-reader/files/alice.epub";
const DEMO_NAME = "Alice in wonderland";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
    background: #333;
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
  }
`;

const ReaderTest2 = (props) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [location, setLocation] = useState(
    storage && storage.getItem("epub-location")
      ? storage.getItem("epub-location")
      : 2,
  );
  const [localFile, setLocalFile] = useState(null);
  const [localName, setLocalName] = useState(null);
  const [largeText, setLargeText] = useState(false);

  const rendition: any = null;

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     fullscreen: false,
  //     location:
  //       storage && storage.getItem("epub-location")
  //         ? storage.getItem("epub-location")
  //         : 2,
  //     localFile: null,
  //     localName: null,
  //     largeText: false
  //   };
  //   this.rendition = null;
  // }

  const toggleFullscreen = () => {
    setFullScreen(!fullScreen);
    // this.setState(
    //   {
    //     fullscreen: !this.state.fullscreen
    //   },
    //   () => {
    //     setTimeout(() => {
    //       const evt = document.createEvent("UIEvents");
    //       evt.initUIEvent("resize", true, false, global, 0);
    //     }, 1000);
    //   }
    // );
  };

  useEffect(() => {
    setTimeout(() => {
      const evt: any = document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, global, 0);
    }, 1000);
  }, [fullScreen]);

  const onLocationChanged = location => {
    setLocation(location);
    // this.setState(
    //   {
    //     location
    //   },
    //   () => {
    //     storage && storage.setItem("epub-location", location);
    //   }
    // );
  };

  useEffect(() => {
    storage && storage.setItem("epub-location", location);
  }, [location]);

  const onToggleFontSize = () => {
    const nextState = largeText;
    setLargeText(nextState);
    // this.setState(
    //   {
    //     largeText: nextState
    //   },
    //   () => {
    //     this.rendition.themes.fontSize(nextState ? "140%" : "100%");
    //   }
    // );
  };

  useEffect(() => {
    rendition.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);

  const getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    rendition = rendition;
    rendition.themes.fontSize(largeText ? "140%" : "100%");
  };

  const handleChangeFile = (event, results) => {
    if (results.length > 0) {
      const [e, file] = results[0];
      if (file.type !== "application/epub+zip") {
        return alert("Unsupported type");
      }
      setLocalFile(e.target.result);
      setLocalName(file.name);
      setLocation(null);
      // this.setState({
      //   localFile: e.target.result,
      //   localName: file.name,
      //   location: null
      // });
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <Bar>
        <LogoWrapper href="https://github.com/gerhardsletten/react-reader">
          <Logo
            src="https://gerhardsletten.github.io/react-reader/files/react-reader.svg"
            alt="React-reader - powered by epubjs"
          />
        </LogoWrapper>
        <ButtonWrapper>
          <FileReaderInput as="buffer" onChange={handleChangeFile}>
            <GenericButton>Upload local epub</GenericButton>
          </FileReaderInput>
          <GenericButton onClick={toggleFullscreen}>
            Use full browser window
            <CloseIcon />
          </GenericButton>
        </ButtonWrapper>
      </Bar>
      <ReaderContainer fullscreen={fullScreen}>
        <ReactReader
          url={localFile || DEMO_URL}
          title={localName || DEMO_NAME}
          location={location}
          locationChanged={onLocationChanged}
          getRendition={getRendition}
        />
        <FontSizeButton onClick={onToggleFontSize}>
          Toggle font-size
        </FontSizeButton>
      </ReaderContainer>
    </Container>
  );
}

export default ReaderTest2;
