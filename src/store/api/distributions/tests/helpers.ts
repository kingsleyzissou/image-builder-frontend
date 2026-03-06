import { ALL_CUSTOMIZATIONS } from '@/store/api/distributions/constants';
import { computeRestrictions } from '@/store/api/distributions/hooks';
import { CustomizationType } from '@/store/api/distributions/types';
import isRhel from '@/Utilities/isRhel';

export interface ComputeRestrictionStrategyArgs {
  isImageMode: boolean;
  isOnPremise: boolean;
  distro?: string;
}

export const computeRestrictionStrategy = ({
  isImageMode,
  isOnPremise,
  distro = 'rhel-9',
}: ComputeRestrictionStrategyArgs) => {
  return computeRestrictions({
    imageTypes: {},
    context: {
      isImageMode,
      isOnPremise,
      isRhel: isRhel(distro),
    },
  });
};

export const getAllCustomizationTypes = (): CustomizationType[] => [
  ...ALL_CUSTOMIZATIONS,
];
