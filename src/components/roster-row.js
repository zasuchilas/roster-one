import React, { Component } from 'react';
import PlaceBlock from './place-block';
import Links from './links';
import {
  EVENT_VIEW_ACTION_HIDE,
  EVENT_VIEW_ACTION_MARK,
  EVENT_VIEW_STATE_HIDDEN,
  EVENT_VIEW_STATE_MARKED,
} from '../templates/list-page';

class RosterRow extends Component {
  state = {
    edit: false,
  };

  toggleEdit = () => {
    this.setState(prev => {
      const edit = !prev.edit;
      return { edit };
    });
  };

  render() {
    const { node, place, placeExt, msg, custom, onAction } = this.props;
    const { edit } = this.state;

    const editClass = edit ? 'edit' : '';
    const viewClass = custom && custom.view ? custom.view : '';
    const classes = `roster-row ${viewClass} ${editClass}`;
    const markBtnCaption =
      viewClass === EVENT_VIEW_STATE_MARKED ? 'Не выделять' : 'Выделить';
    const hideBtnCaption =
      viewClass === EVENT_VIEW_STATE_HIDDEN ? 'Не скрывать' : 'Скрыть';

    if (msg) {
      return (
        <p className="roster-row">
          <span className="roster-desc">{msg}</span>
        </p>
      );
    }

    const { dateFormated, text, desc, tagsDetails, links, pathKey } = node;

    const tagsBlock = (
      <div className="roster-tags">
        <span>{tagsDetails.join(' | ')}</span>
      </div>
    );

    const actionBtnBlock = (
      <button
        className="btn action-btn ml-1"
        onClick={this.toggleEdit}
        title="Действия (выделить, скрыть, добавить заметку)"
      >
        ☰{/*⋮*/}
      </button>
    );

    const dateBlock = dateFormated ? (
      <div className="row-header">
        <div className="roster-date">{dateFormated}</div>
        <div>{actionBtnBlock}</div>
      </div>
    ) : null;

    const textBlock = dateBlock ? (
      <div>
        <span className="roster-text">{text}</span>
      </div>
    ) : (
      <div>
        <span className="roster-text">{text}</span>
        {actionBtnBlock}
      </div>
    );

    return (
      <li className={classes}>
        <div>
          {dateBlock}
          {textBlock}
          <div className="roster-desc">
            <span>{desc}</span>
          </div>
          <div className="roster-place-block">
            {' '}
            <PlaceBlock place={place} ext={placeExt} />
          </div>
          {tagsBlock}
          <div className="roster-links-block">
            <Links linkList={links} />
          </div>
          <div className="actions">
            <button
              className="btn action-btn"
              onClick={() => onAction(EVENT_VIEW_ACTION_MARK, pathKey)}
              title="Выделить событие / снять выделение"
            >
              {markBtnCaption}
            </button>
            <button
              className="btn action-btn"
              onClick={() => onAction(EVENT_VIEW_ACTION_HIDE, pathKey)}
              title="Скрыть событие / не скрывать"
            >
              {hideBtnCaption}
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default RosterRow;
