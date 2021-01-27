import React, { Component } from 'react';

const OPENED_MENU = 'menu';
const OPENED_SUBSCRIPTION = 'subscription';

class Root extends Component {
  state = {
    opened: null,
    expired: false,
  };

  onToggle = action => {
    this.setState(prev => {
      if (prev.opened === action) {
        return { opened: null };
      } else {
        return { opened: action };
      }
    });
  };

  render() {
    const navigation = this.props.children;
    const { opened, expired } = this.state;
    const rootBody = !opened
      ? null
      : opened === OPENED_MENU
      ? navigation
      : 'оформление подписки';
    const expiredNotification = expired ? (
      <div>Вам доступно 95% материалов</div>
    ) : null;
    return (
      <div className="root mt-2 mb-2">
        <div className="tab-block">
          <button
            className="btn tab-btn"
            onClick={() => this.onToggle(OPENED_MENU)}
          >
            Разделы
          </button>
          <div className="tab-delimiter">|</div>
          <button
            className="btn tab-btn"
            onClick={() => this.onToggle(OPENED_SUBSCRIPTION)}
          >
            Подписка до 31.01.2021
          </button>
        </div>
        <div className="root-body mt-2">
          {expiredNotification}
          {rootBody}
        </div>
      </div>
    );
  }
}

export default Root;
