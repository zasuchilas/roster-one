import React, { Component } from 'react';

const getGroupTagSlugs = tagGroup => {
  if (!tagGroup || !tagGroup.length) {
    return [];
  }
  return tagGroup.map(({ slug, type: tagType }) => ({ slug, tagType }));
};

class Filter extends Component {
  state = {
    opened: false,
    tagSlugs: [],
    selected: [],
  };

  componentDidMount() {
    const { tagGroups } = this.props;
    const programTagSlugs = getGroupTagSlugs(tagGroups[0]);
    const regionTagSlugs = getGroupTagSlugs(tagGroups[1]);
    const tagSlugs = [...programTagSlugs, ...regionTagSlugs];
    this.setState({ tagSlugs });
  }

  onSelect = (slug, tagType) => {
    this.setState(({ selected }) => {
      const stateItemIdx = selected.findIndex(
        s => s.tagType === tagType && s.slug === slug,
      );
      // const tagCount = this.getTagCount();
      const newSelected =
        stateItemIdx === -1
          ? [...selected, { tagType, slug }]
          : [
              ...selected.slice(0, stateItemIdx),
              ...selected.slice(stateItemIdx + 1),
            ];
      this.props.onFilterChange(newSelected);
      return { selected: newSelected };
    });
  };

  onClear = () => {
    this.props.onFilterChange([]);
    this.setState({ selected: [] });
  };

  onSelectAll = () => {
    const { tagSlugs: selected } = this.state;
    // const selected = [...tagSlugs[0], ...tagSlugs[1]];
    this.props.onFilterChange(selected);
    this.setState({ selected });
  };

  isSelected = (slug, tagType) => {
    const { selected } = this.state;
    return Boolean(
      selected.find(s => s.tagType === tagType && s.slug === slug),
    );
  };

  getTagCount = () => {
    return this.props.tagGroups.reduce((acc, group) => {
      acc = acc + group.length;
      return acc;
    }, 0);
  };

  render() {
    const { tagGroups, shown, total } = this.props;
    const { opened } = this.state;

    if (!total) {
      return null;
    }

    const info = `(показано ${shown} из ${total})`;
    const commentText = <span>Фильтр {info}</span>;
    const tagsBlock = tagGroups.reduce((acc, group) => {
      if (!group.length) {
        return acc;
      }
      const tagType = group[0].type;
      const groupBlock = group.map(tag => {
        const classNames = this.isSelected(tag.slug, tagType)
          ? 'filter-tag filter-tag-active'
          : 'filter-tag';
        return (
          <button
            key={tag.slug}
            className={classNames}
            onClick={() => this.onSelect(tag.slug, tagType)}
          >
            {tag.text}
          </button>
        );
      });
      acc.push(
        <span key={tagType} className="filter-group">
          {groupBlock}
        </span>,
      );
      return acc;
    }, []);
    const filterBody = (
      <span className="filter-body">
        {tagsBlock}{' '}
        <button className="filter-tag" onClick={this.onClear}>
          Сбросить
        </button>
        <button className="filter-tag" onClick={this.onSelectAll}>
          Выбрать все
        </button>
      </span>
    );
    return (
      <div className="filter">
        {filterBody}
        <div className="comment-block mt-1">
          <div className="mr-1">***</div>
          <div>
            <div>{commentText}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
