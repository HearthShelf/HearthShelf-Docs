import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'HearthShelf',
    description:
      'A self-hosted replacement UI for AudiobookShelf — browser-first, beautifully designed.',
    lang: 'en-US',

    head: [
      ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&family=Geist+Mono:wght@400;500&family=Material+Symbols+Rounded:opsz,wght,FILL@20..48,300..700,0..1&display=block',
        },
      ],
      ['meta', { name: 'theme-color', content: '#1b1a18' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'HearthShelf' }],
    ],

    themeConfig: {
      siteTitle: false,

      nav: [
        { text: 'HearthShelf.com', link: 'https://hearthshelf.com' },
        { text: 'Guide', link: '/guide/what-is-hearthshelf' },
        { text: 'Setup', link: '/setup/docker' },
        { text: 'WebApp', link: '/webapp/overview' },
        {
          text: 'GitHub',
          link: 'https://github.com/HearthShelf/HearthShelf',
        },
      ],

      sidebar: {
        '/guide/': [
          {
            text: 'Introduction',
            items: [
              { text: 'What is HearthShelf?', link: '/guide/what-is-hearthshelf' },
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'FAQ', link: '/guide/faq' },
            ],
          },
        ],
        '/setup/': [
          {
            text: 'Setup',
            items: [
              { text: 'Docker (Slim)', link: '/setup/docker' },
              { text: 'All-in-One', link: '/setup/all-in-one' },
              { text: 'Migrate to All-in-One', link: '/setup/migrate-to-aio' },
              { text: 'Configuration', link: '/setup/configuration' },
              { text: 'Reverse Proxy', link: '/setup/reverse-proxy' },
              { text: 'Remote Access', link: '/setup/remote-access' },
              { text: 'Authentication', link: '/setup/authentication' },
            ],
          },
        ],
        '/webapp/': [
          {
            text: 'Hosted WebApp',
            items: [
              { text: 'Overview', link: '/webapp/overview' },
              { text: 'Architecture', link: '/webapp/architecture' },
              { text: 'Linking & Invites', link: '/webapp/pairing' },
            ],
          },
        ],
      },

      socialLinks: [{ icon: 'github', link: 'https://github.com/HearthShelf/HearthShelf' }],

      footer: {
        message: 'Released under the GNU Affero General Public License v3.',
        copyright:
          'HearthShelf is an independent project, not affiliated with AudiobookShelf. You are responsible for the content you add and the backends you connect.',
      },

      search: {
        provider: 'local',
      },

      editLink: {
        pattern: 'https://github.com/HearthShelf/HearthShelf-Docs/edit/main/docs/:path',
        text: 'Edit this page on GitHub',
      },
    },

    markdown: {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },

    mermaid: {
      theme: 'base',
      securityLevel: 'loose',
      flowchart: {
        htmlLabels: true,
        padding: 12,
        nodeSpacing: 50,
        rankSpacing: 55,
        useMaxWidth: true,
      },
      themeVariables: {
        darkMode: true,
        fontFamily: 'Inter, sans-serif',
        background: '#1b1a18',
        primaryColor: '#2c2b28',
        primaryBorderColor: '#3a3835',
        primaryTextColor: '#e8e3d8',
        secondaryColor: '#232220',
        tertiaryColor: '#232220',
        lineColor: '#9e9a91',
        textColor: '#e8e3d8',
        mainBkg: '#2c2b28',
        nodeBorder: '#3a3835',
        clusterBkg: '#201f1d',
        clusterBorder: '#3a3835',
        edgeLabelBackground: '#1b1a18',
        titleColor: '#e0654a',
        // sequence diagram
        actorBkg: '#2c2b28',
        actorBorder: '#e0654a',
        actorTextColor: '#e8e3d8',
        actorLineColor: '#3a3835',
        signalColor: '#9e9a91',
        signalTextColor: '#e8e3d8',
        labelBoxBkgColor: '#201f1d',
        labelBoxBorderColor: '#3a3835',
        labelTextColor: '#e8e3d8',
        noteBkgColor: '#3a2a24',
        noteBorderColor: '#e0654a',
        noteTextColor: '#e8e3d8',
        activationBkgColor: '#3a3835',
        sequenceNumberColor: '#1b1a18',
      },
    },
  }),
)
