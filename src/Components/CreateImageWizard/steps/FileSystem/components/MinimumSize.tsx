import React, { useEffect, useState } from 'react';

import { Tooltip } from '@patternfly/react-core';

import { ValidatedTextInput } from '@/Components/ValidatedInputs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectComplianceType } from '@/store/slices';
import {
  changePartitionMinSize,
  DiskPartition,
  FilesystemPartition,
  selectBlueprintMode,
  validateFilesystemPartition,
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
  const [draft, setDraft] = useState({
    min_size: partition.min_size ?? '',
    unit: partition.unit || 'GiB',
  });
  const complianceType = useAppSelector(selectComplianceType);
  const blueprintMode = useAppSelector(selectBlueprintMode);

  useEffect(() => {
    setDraft({
      min_size: partition.min_size ?? '',
      unit: partition.unit || 'GiB',
    });
  }, [partition]);

  const sizeInput = (
    <ValidatedTextInput
      id={`min-size-${partition.id}`}
      ariaLabel='minimum partition size'
      placeholder='Define minimum size'
      value={draft.min_size}
      onChange={(_, value) => setDraft({ ...draft, min_size: value })}
      validator={(value) =>
        validateFilesystemPartition(
          { ...draft, min_size: value },
          blueprintMode,
        )
      }
      onCommit={(candidate) => {
        if (!candidate) return;

        dispatch(
          changePartitionMinSize({
            id: partition.id,
            min_size: candidate.min_size,
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
