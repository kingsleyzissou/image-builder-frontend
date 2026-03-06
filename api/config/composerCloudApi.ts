import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile:
    'https://raw.githubusercontent.com/osbuild/osbuild-composer/main/internal/cloudapi/v2/openapi.v2.yml',
  apiFile: '../../src/store/api/backend/onprem/emptyComposerCloudApi.ts',
  apiImport: 'emptyComposerCloudApi',
  outputFile: '../../src/store/api/backend/onprem/composerCloudApi.ts',
  exportName: 'composerCloudApi',
  hooks: false,
  unionUndefined: true,
  filterEndpoints: ['postCompose', 'getComposeStatus'],
};

export default config;
