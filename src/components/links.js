import React from 'react';
import { Link } from 'gatsby';

const getPhoneHref = phoneStr => {
  if (!phoneStr) {
    return '';
  }
  return `tel:+${phoneStr.replace(/\D/g, '')}`;
};

const getHref = (type, text) => {
  switch (type) {
    case 'tel':
    case 'fax':
    case 'mob':
      return getPhoneHref(text);
    case 'sk':
      return `skype:@${text}?chat`;
    case 'tg':
      return `tg://resolve?domain=@${text}`;
    case 'mail':
      return `mailto:${text}`;
    case 'more':
    case 'www':
    case 'vk':
    case 'reg':
      if (text.substr(0, 5) === 'http:' || text.substr(0, 6) === 'https:') {
        return text;
      }
      return `http://${text}`;
    default:
      return text;
  }
};

const getLinkText = type => {
  switch (type) {
    case 'more':
      return 'подробности';
    case 'reg':
      return 'регистрация';
    case 'org':
      return 'организатор';
    default:
      return type;
  }
};

const getLinkElement = (link, inner) => {
  const hrefStr = getHref(link.type, link.src);
  const keyValue = `${link.type}:${link.src}`;
  const countBlock =
    link.count || link.count === 0 ? <sup>{link.count}</sup> : null;
  return inner === true ? (
    <Link to={link.src} key={keyValue} className="links-link">
      {link.type}
      {countBlock}
    </Link>
  ) : (
    <a
      href={hrefStr}
      target="_blank"
      rel="noreferrer"
      className="links-link"
      key={keyValue}
    >
      {getLinkText(link.type)}
    </a>
  );
};

const Links = ({ linkList, inner }) => {
  const linkElements =
    linkList &&
    linkList.length &&
    linkList.map(link => getLinkElement(link, inner));
  return linkElements && linkElements.length ? (
    <span className="links">{linkElements}</span>
  ) : null;
};

export default Links;
