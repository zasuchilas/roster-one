// ideas places region TODO: реализовать позднее через render-функции и адаптеры данных
// const ideas = getYamlBlock(yamlData, IDEAS_FOLDER);
// const ideaList = getIdeaList(places, ideas);
// console.log('ideaList', ideaList);
// ideaList.forEach(ideaItem => {
//   const placeList = ideaItem.places.map(({ node }) =>
//     getPlaceContext({ node }),
//   );
// });

// if (isItPlace(folder)) {
//   // Single organization TODO: только ext
//   createPage({
//     path: `${base}${slug}/`,
//     component: path.resolve(`./src/templates/single-org.js`),
//     context: {
//       base,
//       slug,
//     },
//   });
//
//   // Region organizations TODO: убрать, вместо этого статьи
//   if (!orgBases.has(base)) {
//     orgBases.add(base);
//     createPage({
//       path: `${base}`,
//       component: path.resolve(`./src/templates/region-group-orgs.js`),
//       context: {
//         base,
//       },
//     });
//   }
// }

// if (isItNews(folder)) { // TODO: пока убрать
//   // Single news
//   createPage({
//     path: `${base}${slug}/`,
//     component: path.resolve(`./src/templates/single-news.js`),
//     context: {
//       base,
//       slug,
//     },
//   });
//
//   // Month news
//   if (!newsBases.has(base)) {
//     newsBases.add(base);
//     createPage({
//       path: `${base}`,
//       component: path.resolve(`./src/templates/region-month-news.js`),
//       context: {
//         base,
//       },
//     });
//   }
// }

// TODO: info | knowledge
// });
