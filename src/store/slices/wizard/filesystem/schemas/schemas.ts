import z from 'zod';

import { uniqueBy } from '@/store/slices/wizard/utilities';

import {
  filesystemTypeSchema,
  partitioningModeSchema,
  unitsSchema,
} from './literals';
import {
  imageModeMountpointSchema,
  packageModeMountpointSchema,
} from './mountpoints';
import { uniqueMountpoints } from './utilities';

export const nameSchema = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9+_.][a-zA-Z0-9+_.-]*$/, 'Invalid partition name');

const minsizeSchema = z
  .string()
  .refine((value) => value === '' || /^\d+$/.test(value), {
    error: 'Minsize should be a numeric value only',
    abort: true,
  });

export const requiredMinsizeSchema = minsizeSchema.refine(
  (value) => Number(value) > 0,
  'Minsize should be positive and non-zero',
);

export const optionalMinsizeSchema = minsizeSchema.refine(
  (value) => !value || Number(value) >= 0,
  'Minsize should be not be negative',
);

const filesystemSchemaBuilder = (
  mountpointSchema: z.ZodType<string, string>,
) => {
  const filesystemPartitionSchema = z.object({
    id: z.string(),
    mountpoint: mountpointSchema,
    min_size: requiredMinsizeSchema,
    unit: unitsSchema,
  });

  const filesystemPartitionListSchema = z
    .array(filesystemPartitionSchema)
    .superRefine(uniqueMountpoints());

  const filesystemSchema = z.object({
    partitions: filesystemPartitionListSchema,
  });

  const diskPartitionFieldSchema = z.object({
    id: z.string(),
    min_size: z.string().optional(),
    unit: unitsSchema.optional(),
  });

  const plainPartitionSchema = diskPartitionFieldSchema.extend({
    type: z.literal('plain').optional(),
    label: z.string().optional(),
    part_type: z.string().optional(),
    mountpoint: mountpointSchema.optional(),
    fs_type: filesystemTypeSchema,
  });

  const logicalVolumeSchema = diskPartitionFieldSchema.extend({
    name: nameSchema.optional(),
    minsize: optionalMinsizeSchema.optional(),
    mountpoint: mountpointSchema.optional(),
    label: z.string().optional(),
    fs_type: filesystemTypeSchema,
  });

  const logicalVolumeListSchema = z
    .array(logicalVolumeSchema)
    .superRefine(uniqueBy('volume groups', 'name', (vg) => vg.name));

  const volumeGroupSchema = diskPartitionFieldSchema
    .extend({
      name: nameSchema.optional(),
      minsize: optionalMinsizeSchema.optional(),
      type: z.literal('lvm'),
      part_type: z.string().optional(),
      logical_volumes: logicalVolumeListSchema,
    })
    .superRefine((vg, ctx) => {
      if (!('logical_volumes' in vg)) return;

      for (const [index, volume] of vg.logical_volumes.entries()) {
        if (!volume.name || volume.name !== vg.name) continue;
        ctx.addIssue({
          code: 'custom',
          path: ['logical_volumes', index],
          value: volume.name,
          // prettier-ignore
          message: 'A logical volume must have a different name from its volume group',
        });
      }
    });

  const btrfsSubvolumeSchema = z.object({
    name: nameSchema,
    mountpoint: mountpointSchema,
  });

  const btrfsSubvolumeListSchema = z
    .array(btrfsSubvolumeSchema)
    .superRefine(uniqueBy('btrfs subvolumes', 'name', (sv) => sv.name))
    .superRefine(uniqueMountpoints());

  const brtrsVolumeSchema = diskPartitionFieldSchema.extend({
    type: z.literal('btrfs'),
    part_type: z.string().optional(),
    minsize: optionalMinsizeSchema.optional(),
    subvolumes: btrfsSubvolumeListSchema,
  });

  const mountpointDiskPartitionSchema = z.union([
    plainPartitionSchema,
    logicalVolumeSchema,
  ]);

  const diskPartitionSchema = z.union([
    plainPartitionSchema,
    volumeGroupSchema,
    brtrsVolumeSchema,
  ]);

  const diskPartitionListSchema = z
    .array(diskPartitionSchema)
    .superRefine(uniqueMountpoints());

  const diskSchema = z.object({
    minsize: optionalMinsizeSchema.optional(),
    unit: unitsSchema,
    type: z.literal(['gpt', 'dos']).optional(),
    partitions: diskPartitionListSchema,
  });

  const automaticSchema = z.object({
    mode: z.literal('automatic'),
  });

  const basicSchema = z.object({
    mode: z.literal('basic'),
    filesystem: filesystemSchema,
    partitioningMode: partitioningModeSchema.optional(),
  });

  const advancedSchema = z.object({
    mode: z.literal('advanced'),
    disk: diskSchema,
  });

  const filesystemSliceSchema = z.discriminatedUnion('mode', [
    automaticSchema,
    basicSchema,
    advancedSchema,
  ]);

  return {
    mountpointSchema,
    filesystemPartitionSchema,
    filesystemPartitionListSchema,
    filesystemSchema,
    plainPartitionSchema,
    logicalVolumeSchema,
    volumeGroupSchema,
    brtrsVolumeSchema,
    mountpointDiskPartitionSchema,
    diskPartitionSchema,
    diskSchema,
    automaticSchema,
    basicSchema,
    advancedSchema,
    filesystemSliceSchema,
  };
};

export const filesystemSchemas = {
  package: filesystemSchemaBuilder(packageModeMountpointSchema),
  image: filesystemSchemaBuilder(imageModeMountpointSchema),
};
