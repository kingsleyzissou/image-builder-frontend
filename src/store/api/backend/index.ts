import * as hostedQueries from './hosted';
import * as onpremQueries from './onprem';

// Re-export all types from hosted API
export type * from './hosted';

// Re-export onprem-specific types for components that need them
export type {
  AWSWorkerConfig,
  Bootc,
  CloudApiBlueprint,
  CloudProviderConfigState,
  ComposerAwsUploadRequestOptions,
  ComposerBlueprintResponse,
  ComposerComposesResponseItem,
  ComposerCreateBlueprintRequest,
  ComposerImageRequest,
  ComposerUpdateBlueprintApiArg,
  ComposerUploadTypes,
  Headers,
  LocalUploadStatus,
  Method,
  Params,
  WorkerConfigRequest,
  WorkerConfigResponse,
} from './onprem';

// Conditional exports based on deployment environment
export const useGetArchitecturesQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetArchitecturesQuery
  : hostedQueries.useGetArchitecturesQuery;

export const useGetBlueprintQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetBlueprintQuery
  : hostedQueries.useGetBlueprintQuery;

export const useGetBlueprintsQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetBlueprintsQuery
  : hostedQueries.useGetBlueprintsQuery;

export const useLazyGetBlueprintsQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useLazyGetBlueprintsQuery
  : hostedQueries.useLazyGetBlueprintsQuery;

export const useCreateBlueprintMutation = process.env.IS_ON_PREMISE
  ? onpremQueries.useCreateBlueprintMutation
  : hostedQueries.useCreateBlueprintMutation;

export const useUpdateBlueprintMutation = process.env.IS_ON_PREMISE
  ? onpremQueries.useUpdateBlueprintMutation
  : hostedQueries.useUpdateBlueprintMutation;

export const useDeleteBlueprintMutation = process.env.IS_ON_PREMISE
  ? onpremQueries.useDeleteBlueprintMutation
  : hostedQueries.useDeleteBlueprintMutation;

export const useGetOscapProfilesQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetOscapProfilesQuery
  : hostedQueries.useGetOscapProfilesQuery;

export const useGetOscapCustomizationsQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetOscapCustomizationsQuery
  : hostedQueries.useGetOscapCustomizationsQuery;

export const useLazyGetOscapCustomizationsQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useLazyGetOscapCustomizationsQuery
  : hostedQueries.useLazyGetOscapCustomizationsQuery;

// Compliance hooks are only available in hosted environment
export const useGetComplianceCustomizationsQuery =
  hostedQueries.useGetOscapCustomizationsForPolicyQuery;

export const useLazyGetComplianceCustomizationsQuery =
  hostedQueries.useLazyGetOscapCustomizationsForPolicyQuery;

export const useComposeBlueprintMutation = process.env.IS_ON_PREMISE
  ? onpremQueries.useComposeBlueprintMutation
  : hostedQueries.useComposeBlueprintMutation;

export const useGetComposesQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetComposesQuery
  : hostedQueries.useGetComposesQuery;

export const useGetBlueprintComposesQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetBlueprintComposesQuery
  : hostedQueries.useGetBlueprintComposesQuery;

export const useGetComposeStatusQuery = process.env.IS_ON_PREMISE
  ? onpremQueries.useGetComposeStatusQuery
  : hostedQueries.useGetComposeStatusQuery;

export const useBackendPrefetch = process.env.IS_ON_PREMISE
  ? onpremQueries.composerApi.usePrefetch
  : hostedQueries.imageBuilderApi.usePrefetch;

export const backendApi = process.env.IS_ON_PREMISE
  ? onpremQueries.composerApi
  : hostedQueries.imageBuilderApi;

// Re-export the individual APIs for direct access if needed
export { imageBuilderApi, errorMessage } from './hosted';
export { composerApi, toCloudAPIComposeRequest } from './onprem';

// Hosted-only hooks (not available on-prem)
export const useFixupBlueprintMutation =
  hostedQueries.useFixupBlueprintMutation;
export const useRecommendPackageMutation =
  hostedQueries.useRecommendPackageMutation;

// On-prem-only hooks (not available hosted)
export const usePodmanImagesQuery = onpremQueries.usePodmanImagesQuery;
export const useGetWorkerConfigQuery = onpremQueries.useGetWorkerConfigQuery;
export const useUpdateWorkerConfigMutation =
  onpremQueries.useUpdateWorkerConfigMutation;
export const useLazyExportBlueprintCockpitQuery =
  onpremQueries.useLazyExportBlueprintCockpitQuery;

// Hosted-only export hook
export const useLazyExportBlueprintQuery =
  hostedQueries.useLazyExportBlueprintQuery;
