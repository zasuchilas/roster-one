import React, { Component } from 'react';
import Layout from '../components/layout';
import Links from '../components/links';
import SEO from '../components/seo';

const getUniqMonths = navData => {
  if (!navData) {
    return [];
  }
  return navData
    .reduce((acc, navDataItem) => {
      const { monthSlug, monthName } = navDataItem;
      const isAlready = acc.find(
        monthItem => monthItem['monthSlug'] === monthSlug,
      );
      if (!isAlready) {
        acc.push({
          monthSlug,
          monthName,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => (a.monthSlug > b.monthSlug ? -1 : 1));
};

const getUniqNavMonths = (programNavData, regionNavData) => {
  const programMonths = getUniqMonths(programNavData);
  const regionMonths = getUniqMonths(regionNavData);
  const unionMonths = programMonths.concat(regionMonths);
  return getUniqMonths(unionMonths);
};

const getMonthNavs = (monthSlug, navData) => {
  return navData && navData.filter(navItem => navItem.monthSlug === monthSlug);
};

const ARCHIVE_INDEX_MONTH_KEY = 'archive-index-month';
const PAGE_TITLE = 'Архив';
const PAGE_DESCRIPTION =
  'Навигация по всем имеющимся страницам событий типа месяц + регион/программа';
const seoData = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: 'архив, база',
};

class ArchivePage extends Component {
  state = {
    month: null,
  };

  componentDidMount() {
    const savedMonth = localStorage.getItem(ARCHIVE_INDEX_MONTH_KEY);
    if (savedMonth) {
      this.onMonthSelect(savedMonth);
    }
  }

  onMonthSelect = month => {
    this.setState({
      month,
    });
    localStorage.setItem(ARCHIVE_INDEX_MONTH_KEY, month);
  };

  render() {
    const {
      pageContext,
      location: { pathname },
    } = this.props;
    const { month } = this.state;
    const { programNavData, regionNavData, layoutData } = pageContext;
    const { siteMetadata } = layoutData;
    const seoDataProps = { ...seoData, pathname, siteMetadata };

    const uniqMonths = getUniqNavMonths(programNavData, regionNavData);
    const uniqMonthsBlock = uniqMonths.map(({ monthSlug, monthName }) => (
      <button
        className={
          monthSlug === month ? 'filter-tag filter-tag-active' : 'filter-tag'
        }
        key={monthSlug}
        onClick={() => this.onMonthSelect(monthSlug)}
      >
        {monthName}
      </button>
    ));
    const programMonthNavs = getMonthNavs(month, programNavData);
    const regionMonthNavs = getMonthNavs(month, regionNavData);
    const programBlock = month ? (
      <div className="mb-1">
        <span className="bold">Программы событий: {month}/ </span>
        <Links linkList={programMonthNavs} inner={true} />
      </div>
    ) : null;
    const regionBlock = month ? (
      <div className="mb-1">
        <span className="bold">События по регионам: {month}/ </span>
        <Links linkList={regionMonthNavs} inner={true} />
      </div>
    ) : null;
    const emptyMessage = !month ? <div>Выберите месяц</div> : null;
    return (
      <Layout layoutData={layoutData}>
        <SEO {...seoDataProps} />
        <div className="dark-page-header border-bottom">
          <h1>{PAGE_TITLE}</h1>
          <p className="lead-text mb-0">{PAGE_DESCRIPTION}</p>
        </div>
        <div className="nav-block">
          <div className="mb-1 filter">{uniqMonthsBlock}</div>
          {emptyMessage}
          {programBlock}
          {regionBlock}
        </div>
      </Layout>
    );
  }
}

export default ArchivePage;
