import React, { Component, Fragment } from 'react';
import Logo from './logo';
import Navigation from './navigation';
import Root from './root';

const SCROLL_OFFSET = 512;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setRoot();
  }

  setRoot = () => {
    if (+document.documentElement.clientHeight >= 512) {
      const fontSize = `${+document.documentElement.clientWidth * 0.046}px`;
      document.documentElement.style.setProperty('--font-size-sm', fontSize);
    }
  }

  scrollToLeft = () => {
    this.ref.current.scrollLeft -= SCROLL_OFFSET;
  };

  scrollToRight = () => {
    this.ref.current.scrollLeft += SCROLL_OFFSET;
  };

  render() {
    const { children, layoutData } = this.props;
    const { siteMetadata, buildDate, buildTime, eventCountText } = layoutData;
    const {
      logoText,
      logoDesc,
      logoDescButton,
      // logoDescDetails,
    } = siteMetadata;
    const logoProps = {
      logoText,
      logoDesc,
      logoDescButton,
      // logoDescDetails,
      buildDate,
      buildTime,
      eventCountText,
    };

    return (
      <Fragment>
        <button className="btn scroll-btn to-left" onClick={this.scrollToLeft}>
          Влево
        </button>
        <button
          className="btn scroll-btn to-right"
          onClick={this.scrollToRight}
        >
          Вправо
        </button>

        <div className="layout" ref={this.ref}>
          <header>
            <Logo {...logoProps} />
            <Root>
              <Navigation {...layoutData} />
            </Root>
          </header>
          <div className="article">{children}</div>
          <footer className="footer">
            {/*<div>{logoDescDetails}</div>*/}
            roster.one
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Layout;
