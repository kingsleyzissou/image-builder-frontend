import { describe, expect, it } from 'vitest';

import { validateFilesystemSlice } from '@/store/slices/wizard';

import { createBasicPartition } from '../mocks/filesystem';

const validateBasicMinSize = (min_size: string) =>
  validateFilesystemSlice(
    {
      mode: 'basic',
      filesystem: {
        partitions: [
          createBasicPartition({ id: 'root', mountpoint: '/', min_size }),
        ],
      },
    },
    'image',
  );

const validateDiskMinSize = (minsize: string) =>
  validateFilesystemSlice(
    {
      mode: 'advanced',
      disk: { minsize, unit: 'GiB', partitions: [] },
    },
    'image',
  );

const getIssueDetails = (
  errors: ReturnType<typeof validateFilesystemSlice>['errors'],
) => errors.map(({ message, path }) => ({ message, path }));

describe('filesystem size validation', () => {
  describe('mountpoint minimum size', () => {
    it.each(['1', '10', '001'])('accepts positive integer %s', (size) => {
      expect(validateBasicMinSize(size).errors).toEqual([]);
    });

    it.each([
      ['', 'Minsize should be positive and non-zero'],
      ['0', 'Minsize should be positive and non-zero'],
      ['-1', 'Minsize should be a numeric value only'],
      ['1.5', 'Minsize should be a numeric value only'],
      [' 1', 'Minsize should be a numeric value only'],
    ])('rejects invalid size %s', (size, message) => {
      expect(getIssueDetails(validateBasicMinSize(size).errors)).toEqual([
        {
          message,
          path: ['filesystem', 'partitions', 0, 'min_size'],
        },
      ]);
    });
  });

  describe('disk minimum size', () => {
    it.each(['0', '10', '001'])('accepts non-negative integer %s', (size) => {
      expect(validateDiskMinSize(size).errors).toEqual([]);
    });

    it('allows an empty value when no disk minimum is set', () => {
      expect(validateDiskMinSize('').errors).toEqual([]);
    });

    it.each(['-1', '1.5', ' 1'])('rejects invalid size %s', (size) => {
      expect(getIssueDetails(validateDiskMinSize(size).errors)).toEqual([
        {
          message: 'Minsize should be a numeric value only',
          path: ['disk', 'minsize'],
        },
      ]);
    });
  });
});
