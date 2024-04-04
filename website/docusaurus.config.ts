import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

export default {
  title: 'Angular Testing Tools',
  tagline: 'Makes Angular testing easier',
  favicon: 'img/favicon.ico',
  url: 'https://remscodes.github.io',
  baseUrl: '/ngx-testing-tools/',
  organizationName: 'remscodes',
  projectName: 'ngx-testing-tools',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      'classic',
      {
        docs: {
          showLastUpdateTime: true,
          sidebarPath: './sidebars.ts',
          path: './docs',
          editUrl: 'https://github.com/remscodes/ngx-testing-tools/website',
        },
        blog: {
          path: './blog',
          showReadingTime: true,
          editUrl: 'https://github.com/remscodes/ngx-testing-tools/website',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Testing Tools',
      logo: {
        alt: 'My logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs',
          label: 'Docs',
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
        },
        {
          to: '/examples',
          label: 'Examples',
          type: 'docSidebar',
          sidebarId: 'examples',
          position: 'left',
        },
        {
          to: '/reference',
          label: 'Reference',
          type: 'docSidebar',
          sidebarId: 'reference',
          position: 'left',
        },
        // {
        //   to: '/blog',
        //   label: 'Blog',
        //   position: 'right',
        // },
        {
          href: 'https://github.com/remscodes/ngx-testing-tools',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting started',
              to: '/docs/introduction',
            },
            {
              label: 'Examples',
              to: '/docs/examples/about',
            },
            {
              label: 'Reference',
              to: '/docs/reference/api/overview',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/remscodes/ngx-testing-tools',
            },
          ],
        },
      ],
      copyright: `Copyright © 2023-${new Date().getFullYear()} Rémy Abitbol`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;
