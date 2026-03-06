import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/store/cockpit/baseQuery';

// NOTE: The reducerPath 'cockpitApi' is shared across all on-prem API slices
// (contentSources, imageBuilder, etc.) because they all communicate with the
// same cockpit unix socket at /api/image-builder-composer/v2. RTK Query requires
// endpoints that share a backend to use the same API slice to properly manage
// caching and request deduplication.
export const emptyContentSourcesApi = createApi({
  reducerPath: 'cockpitApi',
  baseQuery: baseQuery({
    baseUrl: '/api/image-builder-composer/v2',
  }),
  endpoints: () => ({}),
});
