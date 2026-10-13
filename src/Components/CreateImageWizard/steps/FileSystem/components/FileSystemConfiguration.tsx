import React from 'react';

import { Button, Content } from '@patternfly/react-core';
import { AddCircleOIcon } from '@patternfly/react-icons';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addPartition,
  selectFilesystemPartitions,
  selectSuggestedMountpoint,
} from '@/store/slices/wizard';

import FileSystemTable from './FileSystemTable';
import PartitioningMode from './PartitioningMode';

const FileSystemConfiguration = () => {
  const filesystemPartitions = useAppSelector(selectFilesystemPartitions);
  const nextMountpoint = useAppSelector(selectSuggestedMountpoint);

  const dispatch = useAppDispatch();

  const handleAddPartition = () => {
    const id = crypto.randomUUID();
    dispatch(
      addPartition({
        id,
        mountpoint: nextMountpoint,
        min_size: '1',
        unit: 'GiB',
      }),
    );
  };

  return (
    <>
      <PartitioningMode />
      <FileSystemTable partitions={filesystemPartitions} mode='filesystem' />
      <Content>
        <Button
          className='pf-v6-u-text-align-left'
          variant='link'
          icon={<AddCircleOIcon />}
          onClick={handleAddPartition}
        >
          Add partition
        </Button>
      </Content>
    </>
  );
};

export default FileSystemConfiguration;
