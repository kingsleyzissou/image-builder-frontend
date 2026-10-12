import { filesystemSchemas, FilesystemSlice } from './schemas';

import { ValidationResult } from '../types';
import { validateSchema } from '../validators';

export const validateFilesystemSlice = (
  filesystem: FilesystemSlice,
  mode: 'package' | 'image',
  shouldHide: boolean = false,
): ValidationResult<FilesystemSlice> => {
  if (shouldHide) {
    return {
      errors: [],
    };
  }

  const { filesystemSliceSchema } = filesystemSchemas[mode];
  const result = validateSchema(filesystemSliceSchema, filesystem);

  return {
    data: result.data,
    errors: result.issues,
  };
};
