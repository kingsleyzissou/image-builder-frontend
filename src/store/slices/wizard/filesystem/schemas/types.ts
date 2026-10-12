export type MountpointEntry = {
  type?: string | undefined;
  mountpoint?: string | undefined;
  logical_volumes?: { mountpoint?: string | undefined }[] | undefined;
};
