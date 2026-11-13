import z from 'zod';

import {
  aapRegistrationSchema,
  registerNowLiterals,
  registrationLiterals,
  registrationOptionsSchema,
  registrationSliceSchema,
  satelliteRegistrationSchema,
} from './schemas';

export type RegisterNowType = z.infer<typeof registerNowLiterals>;
export type RegistrationType = z.infer<typeof registrationLiterals>;

export type AapRegistration = z.infer<typeof aapRegistrationSchema>;
export type SatelliteRegistration = z.input<typeof satelliteRegistrationSchema>;
export type RegistrationOptions = z.infer<typeof registrationOptionsSchema>;

export type RegistrationSlice = z.input<typeof registrationSliceSchema>;
