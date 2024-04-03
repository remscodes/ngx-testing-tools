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
        {
          type: 'category',
          label: 'Test Beds',
          collapsed: false,
          collapsible: false,
          items: [
            'api/test-beds/component',
            'api/test-beds/service',
            'api/test-beds/directive',
          ],
        },
        {
          type: 'category',
          label: 'Common',
          collapsed: true,
          items: [
            'api/common/base-tools',
            'api/common/http-testing-tools',
          ],
        },
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
    'reference/version-compatibility',
  ],
} satisfies SidebarsConfig;
