const path = require('path');
const { getYmlDataBundle } = require('./src/utils-node/data-helpers');
const { mainQuery } = require('./src/utils-node/queries');
const { getListTemplateData } = require('./src/utils-node/list-template-data');
const {
  getLayoutData,
  parseNavigationLinks,
} = require('./src/utils-node/layout-data-helpers');
const { getToday, getMskNow } = require('./src/utils-node/date-helpers');

process.env.TZ = 'UTC';

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Yaml`) {
    const fileNode = getNode(node.parent);
    const folder = fileNode.sourceInstanceName;
    const subFolder = fileNode.relativeDirectory;
    const filename = fileNode.name;
    createNodeField({ node, name: `folder`, value: folder });
    createNodeField({ node, name: `subFolder`, value: subFolder });
    createNodeField({ node, name: `filename`, value: filename });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const now = getMskNow(new Date());
  const today = getToday(now);

  const result = await graphql(mainQuery);
  const ymlDataBundle = getYmlDataBundle(result);
  const listTemplatePagesData = getListTemplateData(ymlDataBundle, today);
  const navigationLinks = parseNavigationLinks(listTemplatePagesData);
  const layoutData = getLayoutData(now, today, ymlDataBundle, navigationLinks);

  // build all with list-page template
  listTemplatePagesData.forEach(pageData => {
    const { pagePath, ...context } = pageData;
    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/list-page.js`),
      context: { ...context, layoutData },
    });
  });
};
