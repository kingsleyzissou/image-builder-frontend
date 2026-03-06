import * as serviceQueries from './contentSourcesApi';

import * as cockpitQueries from '../../cockpit/contentSourcesApi';

export * from './emptyContentSourcesApi';

// NOTE: we can't just export everything from the contentSourcesApi
// here since we have different implementations between the on-prem
// version and the hosted service version
export const useSearchRpmMutation = process.env.IS_ON_PREMISE
  ? cockpitQueries.useSearchRpmMutation
  : serviceQueries.useSearchRpmMutation;

export const useListSnapshotsByDateMutation = process.env.IS_ON_PREMISE
  ? cockpitQueries.useListSnapshotsByDateMutation
  : serviceQueries.useListSnapshotsByDateMutation;

// here we can just export all the hooks that aren't implemented in
// cockpit, this is fine because any component that makes use of these
// hooks will be gated and not shown in the on-prem frontend
export const {
  useListFeaturesQuery,
  useSearchPackageGroupMutation,
  useSearchRepositoryModuleStreamsMutation,
  useListRepositoriesQuery,
  useCreateRepositoryMutation,
  useBulkImportRepositoriesMutation,
  useListRepositoriesRpmsQuery,
  useListRepositoryParametersQuery,
  useListTemplatesQuery,
  useGetTemplateQuery,
  contentSourcesApi,
} = serviceQueries;

// we need to re-export all the types
export type * from './contentSourcesApi';
