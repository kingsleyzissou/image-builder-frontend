import z from 'zod';

import { MountpointEntry } from './types';

export const uniqueMountpoints = () => {
  return (partitions: MountpointEntry[], ctx: z.RefinementCtx) => {
    const seen = new Set<string>();

    for (const [index, partition] of partitions.entries()) {
      if ('type' in partition && partition.type === 'btrfs') continue;

      if ('mountpoint' in partition && partition.mountpoint) {
        if (seen.has(partition.mountpoint)) {
          ctx.addIssue({
            code: 'custom',
            path: [index],
            message: 'Duplicate mountpoint',
          });
          continue;
        }

        seen.add(partition.mountpoint);
        continue;
      }

      if (!partition.logical_volumes) continue;
      for (const [vIndex, volume] of partition.logical_volumes.entries()) {
        if (!volume.mountpoint) continue;

        if (seen.has(volume.mountpoint)) {
          ctx.addIssue({
            code: 'custom',
            path: [index, 'logical_volumes', vIndex],
            message: 'Duplicate mountpoint',
          });
          continue;
        }

        seen.add(volume.mountpoint);
      }
    }
  };
};
