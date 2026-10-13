import React, { useEffect, useState } from 'react';

import { Tooltip } from '@patternfly/react-core';

import { ValidatedTextInput } from '@/Components/ValidatedInputs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectComplianceType } from '@/store/slices';
import {
  changePartitionMinSize,
  DiskPartition,
  FilesystemPartition,
  validateRequiredMinsize,
} from '@/store/slices/wizard';

type MinimumSizeProps = {
  partition: FilesystemPartition | DiskPartition;
  isOscapRequired?: boolean;
  oscapMinSizeLabel?: string;
};

const MinimumSize = ({
  partition,
  isOscapRequired,
  oscapMinSizeLabel,
}: MinimumSizeProps) => {
  const dispatch = useAppDispatch();
  const [minsize, setMinsize] = useState(partition.min_size ?? '');
  const complianceType = useAppSelector(selectComplianceType);

  useEffect(() => {
    // Reset the minsize when the partition changes externally.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinsize(partition.min_size ?? '');
  }, [partition]);

  const sizeInput = (
    <ValidatedTextInput
      id={`min-size-${partition.id}`}
      ariaLabel='minimum partition size'
      placeholder='Define minimum size'
      value={minsize}
      onChange={(_, value) => setMinsize(value)}
      validator={(value) =>
        validateRequiredMinsize(value, partition.unit || 'GiB')
      }
      onCommit={(candidate) => {
        if (!candidate) return;

        dispatch(
          changePartitionMinSize({
            id: partition.id,
            min_size: candidate,
          }),
        );
      }}
    />
  );

  if (isOscapRequired && oscapMinSizeLabel) {
    return (
      <Tooltip
        content={`Minimum ${oscapMinSizeLabel} required by the selected ${complianceType === 'openscap' ? 'OpenSCAP profile' : 'compliance policy'}`}
      >
        <div>{sizeInput}</div>
      </Tooltip>
    );
  }

  return sizeInput;
};

export default MinimumSize;
