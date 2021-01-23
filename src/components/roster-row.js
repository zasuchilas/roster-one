import React from 'react';
import PlaceBlock from './place-block';
import Links from './links';
import {
  EVENT_VIEW_ACTION_HIDE,
  EVENT_VIEW_ACTION_MARK,
} from '../templates/list-page';

const RosterRow = props => {
  const { node, place, placeExt, msg, custom, onAction } = props;

  const view = custom && custom.view;
  const classes = view ? `roster-row opened ${view}` : 'roster-row opened';

  if (msg) {
    return (
      <p className="roster-row">
        <span className="roster-desc">{msg}</span>
      </p>
    );
  }

  const { dateFormated, text, desc, tagsDetails, links, pathKey } = node;

  const tagsBlock = (
    <div className="roster-tags"><span>{tagsDetails.join(' | ')}</span></div>
  );

  return (
    <li className={classes}>
      <div>
        <div className="row-header">
          <div className="roster-date">{dateFormated}</div>
          <div className="actions">
            <button
              className="btn action-btn"
              onClick={() => onAction(EVENT_VIEW_ACTION_MARK, pathKey)}
              title="Выделить событие"
            >
              Выделить
            </button>
            <button
              className="btn action-btn"
              onClick={() => onAction(EVENT_VIEW_ACTION_HIDE, pathKey)}
              title="Скрыть событие"
            >
              Скрыть
            </button>
            {/*<button*/}
            {/*  className="btn action-btn"*/}
            {/*  onClick={() => onAction('note', pathKey)}*/}
            {/*  title="Добавить заметку"*/}
            {/*>*/}
            {/*  Зам*/}
            {/*</button>*/}
          </div>
        </div>
        <div>
          <span className="roster-text">{text}</span>
        </div>
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
      </div>
    </li>
  );
};

export default RosterRow;
