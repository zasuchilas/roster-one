import React, { Component } from 'react';
import { Link } from 'gatsby';
import LogoFlat from '../../content/images/logo-flat.svg';

class Logo extends Component {
  state = {
    opened: false,
  };

  onToggle = () => {
    this.setState(state => {
      return { opened: !state.opened };
    });
  };

  render() {
    const { buildDate, buildTime } = this.props;

    return (
      <div className="logo mb-2">
        <div>
          <span className="build-date">{buildDate}</span>
          <span className="build-time">{buildTime}</span>
        </div>
        <Link to="/" className="logo-link">
          <LogoFlat />
        </Link>
        <div className="comment-block">
          <div className="mr-1">*</div>
          <div>
            <div>Roster.one (ростер ван) список номер один</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Logo;
