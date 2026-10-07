import z from 'zod';

import {
  filesystemModeSchema,
  filesystemTypeSchema,
  partitioningModeSchema,
  unitsSchema,
} from './literals';
import type { filesystemSchemas, requiredMinsizeSchema } from './schemas';

export type MountpointEntry = {
  type?: string | undefined;
  mountpoint?: string | undefined;
  logical_volumes?: { mountpoint?: string | undefined }[] | undefined;
};

export type Minsize = z.infer<typeof requiredMinsizeSchema>;
export type Units = z.infer<typeof unitsSchema>;
export type FilesystemType = z.infer<typeof filesystemTypeSchema>;
export type PartitioningMode = z.infer<typeof partitioningModeSchema>;
export type FilesystemMode = z.infer<typeof filesystemModeSchema>;

type Schemas = (typeof filesystemSchemas)['package'];

export type FilesystemPartition = z.infer<Schemas['filesystemPartitionSchema']>;
export type Filesystem = z.infer<Schemas['filesystemSchema']>;
export type PlainPartition = z.infer<Schemas['plainPartitionSchema']>;
export type LogicalVolume = z.infer<Schemas['logicalVolumeSchema']>;
export type VolumeGroup = z.infer<Schemas['volumeGroupSchema']>;
export type BtrfsVolume = z.infer<Schemas['brtrsVolumeSchema']>;
export type Disk = z.infer<Schemas['diskSchema']>;
export type DiskPartition = z.infer<Schemas['diskPartitionSchema']>;
export type MountpointDiskPartition = z.infer<
  Schemas['mountpointDiskPartitionSchema']
>;

export type AutomaticFS = z.infer<Schemas['automaticSchema']>;
export type BasicFS = z.infer<Schemas['basicSchema']>;
export type AdvancedFS = z.infer<Schemas['advancedSchema']>;

export type FilesystemSlice = z.infer<Schemas['filesystemSliceSchema']>;
