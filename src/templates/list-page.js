import React, { Component } from 'react';
import Layout from '../components/layout';
import RosterRow from '../components/roster-row';
import showdown from 'showdown';
import Filter from '../components/filter';
import SEO from '../components/seo';

const converter = new showdown.Converter(); // TODO: не создавать каждый раз
const EMPTY_ROWS = 'Oops! ничего не найдено';

const getTagTypes = filters => {
  const tagTypeSet = new Set();
  filters.forEach(filter => {
    tagTypeSet.add(filter.tagType);
  });
  return Array.from(tagTypeSet);
};

const getTagTypeFilters = (filters, tagTypes) => {
  return tagTypes.map(tagType =>
    filters.filter(filter => filter.tagType === tagType),
  );
};

const getKeyType = key => {
  const keyParts = key.split('/');
  const lastKeyPart = keyParts[keyParts.length - 2];
  const isType = ['view'].includes(lastKeyPart);
  return isType ? lastKeyPart : undefined;
};

const getEventKeyIdFromViewKey = lsKey => {
  return lsKey.replace('view/', '');
};

const SWITCH_VIEW_REMOVE_NONE_LS_ACTIONS = 'remove-none';
const SWITCH_VIEW_ADD_REMOVE_LS_ACTIONS = 'add-remove';
const SWITCH_VIEW_ADD_NONE_LS_ACTIONS = 'add-none';
const switchViewState = switchOptions => {
  const nextViewState = {
    markedEvents: [],
    hiddenEvents: [],
  };
  let lsActions = '';
  const {
    targetName,
    secondName,
    // markedEvents,
    // hiddenEvents,
    eventKey,
  } = switchOptions;
  const targetEvents = switchOptions[targetName];
  const secondEvents = switchOptions[secondName];
  const targetIdx = targetEvents.findIndex(key => key === eventKey);
  const secondIdx = secondEvents.findIndex(key => key === eventKey);
  if (targetIdx !== -1) {
    nextViewState[targetName] = targetEvents.filter(item => item !== eventKey);
    nextViewState[secondName] = secondEvents;
    lsActions = SWITCH_VIEW_REMOVE_NONE_LS_ACTIONS;
  } else {
    nextViewState[targetName] = [...targetEvents, eventKey];
    if (secondIdx !== -1) {
      nextViewState[secondName] = secondEvents.filter(
        item => item !== eventKey,
      );
      lsActions = SWITCH_VIEW_ADD_REMOVE_LS_ACTIONS;
    } else {
      nextViewState[secondName] = secondEvents;
      lsActions = SWITCH_VIEW_ADD_NONE_LS_ACTIONS;
    }
  }
  return { nextViewState, lsActions };
};

export const EVENT_VIEW_STATE_MARKED = 'marked';
export const EVENT_VIEW_STATE_HIDDEN = 'hidden';
export const EVENT_VIEW_ACTION_MARK = 'mark';
export const EVENT_VIEW_ACTION_HIDE = 'hide';

const updateSwitchViewLS = (lsActions, eventKey, eventViewState) => {
  const eventViewKey = `${eventKey}view/`;
  switch (lsActions) {
    case SWITCH_VIEW_REMOVE_NONE_LS_ACTIONS:
      localStorage.removeItem(eventViewKey);
      break;
    case SWITCH_VIEW_ADD_NONE_LS_ACTIONS:
      localStorage.setItem(eventViewKey, eventViewState);
      break;
    case SWITCH_VIEW_ADD_REMOVE_LS_ACTIONS:
      localStorage.setItem(eventViewKey, eventViewState);
      break;
    default:
      break;
  }
};

class ListPage extends Component {
  state = {
    tagTypeFilters: [],
    hiddenEvents: [],
    markedEvents: [],
  };

  onFilterChange = filters => {
    const tagTypes = getTagTypes(filters);
    const tagTypeFilters = getTagTypeFilters(filters, tagTypes);
    // this.setState({ filters, tagTypes, tagTypeFilters });
    this.setState({ tagTypeFilters });
  };

  tagFilterFn = node => {
    const { tagTypeFilters } = this.state;
    if (!tagTypeFilters.length) {
      return true;
    }
    return tagTypeFilters.reduce((acc, tagTypeFilter) => {
      const tagTypeValue = tagTypeFilter.reduce((typeAcc, filter) => {
        const nodeProp = node[filter.tagType];
        const nodeFilterValue =
          nodeProp && typeof nodeProp === 'string'
            ? nodeProp === filter.slug
            : nodeProp.includes(filter.slug);
        return typeAcc || nodeFilterValue;
      }, false);
      return acc && tagTypeValue;
    }, true);
  };

  componentDidMount() {
    const eventKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('/events/'),
    );

    const hiddenEvents = [];
    const markedEvents = [];
    eventKeys.forEach(eventKey => {
      const eventCustomData = localStorage.getItem(eventKey);
      const keyType = getKeyType(eventKey);
      if (keyType === 'view') {
        const eventKeyId = getEventKeyIdFromViewKey(eventKey);
        if (eventCustomData === EVENT_VIEW_STATE_MARKED) {
          markedEvents.push(eventKeyId);
        }
        if (eventCustomData === EVENT_VIEW_STATE_HIDDEN) {
          hiddenEvents.push(eventKeyId);
        }
      }
    });
    this.setState({ hiddenEvents, markedEvents });
  }

  onAction = (action, eventKey) => {
    switch (action) {
      case EVENT_VIEW_ACTION_MARK:
        this.setState(prevState => {
          const { hiddenEvents, markedEvents } = prevState;
          const { nextViewState, lsActions } = switchViewState({
            targetName: 'markedEvents',
            secondName: 'hiddenEvents',
            markedEvents,
            hiddenEvents,
            eventKey,
          });
          updateSwitchViewLS(lsActions, eventKey, EVENT_VIEW_STATE_MARKED);
          return { ...nextViewState };
        });
        break;
      case EVENT_VIEW_ACTION_HIDE:
        this.setState(prevState => {
          const { hiddenEvents, markedEvents } = prevState;
          const { nextViewState, lsActions } = switchViewState({
            targetName: 'hiddenEvents',
            secondName: 'markedEvents',
            markedEvents,
            hiddenEvents,
            eventKey,
          });
          updateSwitchViewLS(lsActions, eventKey, EVENT_VIEW_STATE_HIDDEN);
          return { ...nextViewState };
        });
        break;
      case 'add-note':
        break;
      case 'edit-note':
        break;
      case 'remove-note':
        break;
      default:
        break;
    }
  };

  render() {
    const {
      pageContext,
      location: { pathname },
    } = this.props;
    const { title, lead, uniqTags, list, layoutData, seoData } = pageContext;
    const { siteMetadata } = layoutData;
    const seoDataProps = { ...seoData, pathname, siteMetadata };

    const { hiddenEvents, markedEvents } = this.state;

    const rows = list.filter(this.tagFilterFn).map(node => {
      const { pathKey: key, place } = node;
      const hidden = hiddenEvents.includes(key);
      const marked = markedEvents.includes(key);
      const view = hidden
        ? EVENT_VIEW_STATE_HIDDEN
        : marked
        ? EVENT_VIEW_STATE_MARKED
        : undefined;
      return (
        <RosterRow
          node={node}
          place={place}
          placeExt={false}
          key={key}
          custom={{ view }}
          onAction={this.onAction}
        />
      );
    });
    const rowsBlock = rows.length ? rows : <RosterRow msg={EMPTY_ROWS} />;
    return (
      <Layout layoutData={layoutData}>
        <SEO {...seoDataProps} />
        <div className="article-header">
          <h1>{title}</h1>
          <span
            className="lead-text"
            dangerouslySetInnerHTML={{ __html: converter.makeHtml(lead) }}
          />
          <Filter
            tagGroups={uniqTags}
            onFilterChange={this.onFilterChange}
            shown={rows.length}
            total={list.length}
          />
        </div>
        <ul className="roster-row-block">{rowsBlock}</ul>
      </Layout>
    );
  }
}

export default ListPage;
