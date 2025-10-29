import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ソービズ様 開発ドキュメント',
  tagline: 'Webサイト開発の仕様書・設計書',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://tsukuneA1.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tsukuneA1', // Usually your GitHub org/user name.
  projectName: 'sobus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/tsukuneA1/sobus/tree/main/docusaurus/',
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],


  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ソービズ様 開発ドキュメント',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'ドキュメント',
        },
        {
          href: 'https://github.com/tsukuneA1/sobus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ドキュメント',
          items: [
            {
              label: 'はじめに',
              to: '/',
            },
            {
              label: '要件定義',
              to: '/requirements/requirements',
            },
            {
              label: 'microCMS設計',
              to: '/microCMS/schema',
            },
          ],
        },
        {
          title: '外部リンク',
          items: [
            {
              label: 'Figmaデザイン',
              href: 'https://www.figma.com/design/SueA7I2vCsatvIf0s7BgB7/%E7%84%A1%E9%A1%8C?node-id=1-2&m=dev',
            },
            {
              label: 'Instagram参考',
              href: 'https://www.instagram.com/wavoc_social_business_/?hl=ja',
            },
          ],
        },
        {
          title: 'その他',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/tsukuneA1/sobus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WINC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
