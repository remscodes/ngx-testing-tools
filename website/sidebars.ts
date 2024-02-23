import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

export default {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/introduction',
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/component',
      ],
    },
  ],
  examples: [
    'examples/about',
  ],
  reference: [
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'reference/api-reference/overview',
      ],
    },
  ]
} satisfies SidebarsConfig;
