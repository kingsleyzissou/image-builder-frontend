import {
  FilesystemPartition,
  filesystemSchemas,
  FilesystemSlice,
  unitsWarningSchema,
} from './schemas';

import { ValidationResult } from '../types';
import { validateSchema } from '../validators';

export const validateFilesystemPartition = (
  partition: Pick<FilesystemPartition, 'unit' | 'min_size'>,
  mode: 'package' | 'image',
): ValidationResult<FilesystemPartition> => {
  const { filesystemPartitionSchema } = filesystemSchemas[mode];
  const result = validateSchema(filesystemPartitionSchema, partition);
  const { issues: warnings } = validateSchema(
    unitsWarningSchema,
    partition.unit,
  );

  return {
    data: result.data,
    errors: result.issues,
    warnings,
  };
};

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
