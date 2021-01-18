import React, { Component } from 'react';

class ToggleBtn extends Component {
  state = {
    opened: this.props.opened,
  };

  onToggle = () => {
    this.setState(state => {
      return { opened: !state.opened };
    });
  };

  render() {
    const { btnText, extText } = this.props;
    const { opened } = this.state;
    const ext = opened ? extText : null;

    return (
      <span className="toggle-btn">
        <button onClick={this.onToggle} className="btn">
          {btnText}
        </button>
        <span>{ext}</span>
      </span>
    );
  }
}

export default ToggleBtn;
