/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    siteTitle: 'Roster.one',
    siteDesc:
      'Списки предстоящих событий - что будет происходить в городе, стране, мире.' +
      'Знать наперед, чтобы включить в свои планы. Жить нужно веселее!',
    siteAuthor: '@roster-one',
    siteKeywords: 'список, события, мероприятия, планы, бесплатно, спорт',
    siteUrl: 'https://roster.one/',
    logoText: 'ROSTER.ONE',
    logoDesc: '',
    // logoDescButton: 'en. список, реестр',
    logoDescButton: 'список номер один',
    logoDescDetails:
      'Мы хотим быть в курсе событий/мероприятий в нашем городе и за его пределами. ' +
      'Подробности и детали нужны, но позже, а чтобы быть в курсе, лучше иметь простые списки и ссылки. ' +
      'Мы собираем и организуем информацию в сжатом виде из множества источников. ' +
      'Мы покрываем далеко не все происходящее, но разве мы хотим знать все-все? ' +
      'Нет, мы хотим знать достаточно много, но не слишком много, ' +
      'потому что в конечном счете мы можем выбрать для себя лишь некоторые события/мероприятия. ' +
      'Roster.one - список номер один - бесплатный сервис - чтобы быть в курсе и легко выбирать.',
    // logoDescDetails:
    //   'Позволяет держать под контролем, ' +
    //   'ориентироваться, быть в курсе. Должен быть достаточно объемным, но ' +
    //   'не обязательно полным. Требуется лаконичность, простота, ' +
    //   'отсутствие преждевременных подробностей. Также важны доступность, актуальность, ' +
    //   'самодостаточность - список должен работать на тебя, не наоборот.',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Roster.one`,
        short_name: `Roster`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#FF0000`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `content/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`, // a fixed string
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'events',
        path: `${__dirname}/content/events`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'places',
        path: `${__dirname}/content/places`,
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'knowledge',
    //     path: `${__dirname}/content/knowledge`,
    //   },
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'news',
    //     path: `${__dirname}/content/news`,
    //   },
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'tags',
    //     path: `${__dirname}/content/tags`,
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'common',
        path: `${__dirname}/content/common`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'ideas',
        path: `${__dirname}/content/ideas`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /image/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        // The ID of yandex metrika.
        trackingId: 71337565,
        // Enabled a webvisor. The default value is `false`.
        webvisor: true,
        // Enables tracking a hash in URL. The default value is `false`.
        trackHash: true,
        // Defines where to place the tracking script - `false` means before body (slower loading, more hits)
        // and `true` means after the body (faster loading, less hits). The default value is `false`.
        afterBody: true,
        // Use `defer` attribute of metrika script. If set to `false` - script will be loaded with `async` attribute.
        // Async enables earlier loading of the metrika but it can negatively affect page loading speed. The default value is `false`.
        defer: false,
      },
    },
  ],
};
