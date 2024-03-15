import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

export default {
  docs: [
    'introduction',
    'getting-started',
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        'api/component',
        'api/service',
        'api/directive',
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
        'reference/api/overview',
      ],
    },
    'reference/version-compatibility'
  ],
} satisfies SidebarsConfig;
