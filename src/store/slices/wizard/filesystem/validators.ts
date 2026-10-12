import {
  filesystemSchemas,
  FilesystemSlice,
  type Minsize,
  optionalMinsizeSchema,
  requiredMinsizeSchema,
  type Units,
  unitsWarningSchema,
} from './schemas';

import { ValidationResult } from '../types';
import { validateSchema } from '../validators';

export const validateRequiredMinsize = (
  // NOTE: size and units are coupled in the ui,
  // the unit size warning is shown under the
  // minsize input for ux reasons
  size: Minsize,
  unit: Units,
): ValidationResult<Minsize> => {
  const result = validateSchema(requiredMinsizeSchema, size);
  const { issues: warnings } = validateSchema(unitsWarningSchema, unit);

  return {
    data: result.data,
    errors: result.issues,
    warnings,
  };
};

export const validateOptionalMinsize = (
  size: Minsize,
): ValidationResult<Minsize> => {
  const result = validateSchema(optionalMinsizeSchema, size);

  return {
    data: result.data,
    errors: result.issues,
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
