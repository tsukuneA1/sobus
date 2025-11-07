import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'オンボーディング',
      items: ['onboarding/react', 'onboarding/component-design'],
    },
    {
      type: 'category',
      label: '要件定義',
      items: ['requirements/requirements', 'requirements/FAQ'],
    },
    {
      type: 'category',
      label: 'ページ実装方針',
      items: [
        'pages/top-page',
        'pages/project-page',
        'pages/blog-page',
      ],
    },
    {
      type: 'category',
      label: 'microCMS設計',
      items: [
        'microCMS/index',
        'microCMS/project',
        'microCMS/blog',
        'microCMS/gallery',
      ],
    },
    'tech-stack',
  ],
};

export default sidebars;
