// Re-export everything from generated API (hooks and types)
export * from './imageBuilderApi';

// Re-export the enhanced API (with cache tags) as the main imageBuilderApi
// This overrides the imageBuilderApi from the generated file
export { imageBuilderApi } from './enhancedImageBuilderApi';

// Re-export utility functions
export { errorMessage } from './enhancedImageBuilderApi';

// Re-export the empty API for potential extension
export { emptyImageBuilderApi } from './emptyImageBuilderApi';
