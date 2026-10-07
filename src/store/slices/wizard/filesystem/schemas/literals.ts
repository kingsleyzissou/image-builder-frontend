import z from 'zod';

export const partitioningModeSchema = z.literal(['raw', 'lvm', 'auto-lvm']);

export const filesystemModeSchema = z.literal([
  'automatic',
  'basic',
  'advanced',
]);

export const unitsSchema = z.literal(['B', 'MiB', 'GiB']);

export const filesystemTypeSchema = z.literal(['ext4', 'xfs', 'vfat', 'swap']);
