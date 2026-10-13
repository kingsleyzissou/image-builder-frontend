import React, { useState } from 'react';

import {
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
} from '@patternfly/react-core';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  changePartitionMountpoint,
  changePartitionType,
  FILESYSTEM_TYPES,
  FilesystemType,
  isPartitionTypeAvailable,
  LogicalVolume,
  selectSuggestedMountpoint,
} from '@/store/slices/wizard';

type PartitionTypeProps = {
  partition: LogicalVolume;
};

const PartitionType = ({ partition }: PartitionTypeProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const nextMountpoint = useAppSelector(selectSuggestedMountpoint);

  const onSelect = (_?: React.MouseEvent, selection?: string | number) => {
    if (selection === undefined) return;

    if (selection === 'swap') {
      dispatch(
        changePartitionMountpoint({
          id: partition.id,
          mountpoint: '',
        }),
      );
    }

    if (partition.mountpoint === '' && selection !== 'swap') {
      dispatch(
        changePartitionMountpoint({
          id: partition.id,
          mountpoint: nextMountpoint,
        }),
      );
    }

    dispatch(
      changePartitionType({
        id: partition.id,
        fs_type: selection as FilesystemType,
      }),
    );
    setIsOpen(false);
  };

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
      isFullWidth
    >
      {partition.fs_type}
    </MenuToggle>
  );

  return (
    <Select
      isOpen={isOpen}
      selected={partition.fs_type}
      onSelect={onSelect}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      toggle={toggle}
      shouldFocusToggleOnSelect
    >
      <SelectList>
        {FILESYSTEM_TYPES.filter((type) =>
          isPartitionTypeAvailable(type, partition),
        ).map((type, index) => (
          <SelectOption key={index} value={type}>
            {type}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
};

export default PartitionType;
