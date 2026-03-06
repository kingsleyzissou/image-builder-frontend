// Re-export the enhanced composer API (with cache tags) as the main composerApi
export { composerApi } from './enhancedComposerApi';

// Re-export hooks and utilities from the base composerApi
export {
  useGetArchitecturesQuery,
  useGetBlueprintQuery,
  useGetBlueprintsQuery,
  useLazyGetBlueprintsQuery,
  useCreateBlueprintMutation,
  useUpdateBlueprintMutation,
  useDeleteBlueprintMutation,
  useGetOscapProfilesQuery,
  useGetOscapCustomizationsQuery,
  useLazyGetOscapCustomizationsQuery,
  useComposeBlueprintMutation,
  useGetComposesQuery,
  useGetBlueprintComposesQuery,
  useGetComposeStatusQuery,
  useLazyExportBlueprintCockpitQuery,
  usePodmanImagesQuery,
  useGetWorkerConfigQuery,
  useUpdateWorkerConfigMutation,
  toCloudAPIComposeRequest,
} from './composerApi';

// Re-export types from cockpit types
export type * from './types';

// Re-export specific types from composerCloudApi (avoiding conflicts with types.ts)
export type {
  Bootc,
  Blueprint as CloudApiBlueprint,
  LocalUploadStatus,
  ComposeStatus,
  ImageTypes as CloudApiImageTypes,
  ComposeRequest as CloudApiComposeRequest,
  Customizations,
} from './composerCloudApi';

// Re-export base query for shared use
export { baseQuery } from './baseQuery';
