const mainQuery = `
  query {
    site {
      siteMetadata {
        siteTitle
        siteDesc
        siteAuthor
        siteKeywords
        siteUrl
        logoText
        logoDesc
        logoDescButton
        logoDescDetails
      }
    }
    allYaml(sort: { fields: date }) {
      edges {
        node {
          id
          date
          text
          desc
          slug
          tags
          place
          address
          links {
            type
            src
          }
          extExp
          extText
          fields {
            folder
            subFolder
            filename
          }
          items
          written
        }
      }
    }
  }
`;

module.exports = {
  mainQuery,
};
