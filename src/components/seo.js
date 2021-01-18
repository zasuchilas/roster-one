import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function SEO({
  siteMetadata,
  lang,
  title,
  description,
  pathname,
  author,
  keywords,
  meta,
  image: metaImage,
}) {
  const {
    siteTitle,
    siteDesc,
    siteAuthor,
    siteKeywords,
    siteUrl,
  } = siteMetadata;

  const metaDescription = description || siteDesc;
  const metaAuthor = author || siteAuthor;
  const metaKeywords = [keywords, siteKeywords].join(', ');
  const image =
    metaImage && metaImage.src ? `${siteUrl}${metaImage.src}` : null;
  const canonical = pathname ? `${siteUrl}${pathname}` : null;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s на ${siteTitle}`}
      link={
        canonical
          ? [
              {
                rel: 'canonical',
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        { name: `description`, content: metaDescription },
        {
          name: `keywords`,
          content: metaKeywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: metaAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          metaImage
            ? [
                {
                  property: 'og:image',
                  content: image,
                },
                {
                  property: 'og:image:width',
                  content: metaImage.width,
                },
                {
                  property: 'og:image:height',
                  content: metaImage.height,
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: 'twitter:card',
                  content: 'summary',
                },
              ],
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  siteMetadata: PropTypes.shape({
    siteTitle: PropTypes.string.isRequired,
    siteDesc: PropTypes.string.isRequired,
    siteAuthor: PropTypes.string.isRequired,
    siteKeywords: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
  }),
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pathname: PropTypes.string,
  author: PropTypes.string,
  keywords: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
};

export default SEO;
