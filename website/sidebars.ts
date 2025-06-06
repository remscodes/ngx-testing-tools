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
            'api/test-beds/directive',
            'api/test-beds/pipe',
            'api/test-beds/service',
            'api/test-beds/interceptor',
            'api/test-beds/guard',
            'api/test-beds/resolver',
            'api/test-beds/router',
            'api/test-beds/module',
          ],
        },
        {
          type: 'category',
          label: 'Common tools',
          collapsed: true,
          items: [
            'api/common/base-tools',
            'api/common/renderer-tools',
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
    // {
    //   type: 'category',
    //   label: 'API Reference',
    //   items: [
    //     'reference/api/overview',
    //   ],
    // },
    'reference/version-compatibility',
  ],
} satisfies SidebarsConfig;
