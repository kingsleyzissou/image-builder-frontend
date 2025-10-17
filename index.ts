import { z } from 'zod/v4';

// TODO: maybe we could have a more descriptive name for this function
export const unique = (key: string) => {
  return (data: string[], ctx: z.RefinementCtx) => {
    if (!data || data.length == 0) {
      return;
    }

    const seen = new Set();
    data.forEach((item, index) => {
      if (seen.has(item)) {
        ctx.addIssue({
          code: 'custom',
          message: `The ${key} items must be unique`,
          path: [index],
        });
      } else {
        seen.add(item);
      }
    });
  };
};

const UsernameSchema = z
  .string()
  .max(32, 'The username cannot be longer than 32 characters')
  .regex(/^(?!\d+$).+$/, 'The username must contain atleast one letter')
  // TODO: more descriptive error message
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*[a-zA-Z0-9_$]$/, 'invalid username');

export const UserSchema = z.object({
  username: UsernameSchema,
  groups: z
    .array(
      z
        .string()
        .max(32, 'The group cannot be longer than 32 characters')
        .regex(/^(?!\d+$).+$/, 'The groupname must contain at least one letter')
        // TODO: more descriptive error message
        .regex(/^[a-zA-Z0-9_][a-zA-Z0-9_-]*(\$)?$/, 'invalid group'),
    )
    // we have to parse a callback to zod's superRefine
    // function in order to validate item uniqueness
    .superRefine(unique('group'))
    .optional(),
  sshkey: z.optional(
    z
      .string()
      // we can do the regex checks incrementally so that we can have clearer error messages
      .regex(
        // 1. Key types: ssh-rsa, ssh-dss, ssh-ed25519, or ecdsa-sha2-nistp(256|384|521).
        /^ssh-(ed25519|rsa|dss|ecdsa)|ecdsa-sha2-nistp(256|384|521)/,
        'SSH key must be one of ssh-rsa, ssh-dss, ssh-ed25519, or ecdsa-sha2-nistp(256|384|521)',
      )
      .regex(
        // 2. Base64-encoded key material.
        // 3. Optional comment at the end.
        /^(ssh-(rsa|dss|ed25519)|ecdsa-sha2-nistp(256|384|521))\s+[A-Za-z0-9+/=]+(\s+\S+)?$/,
        'SSH key data must be base64 encoded',
      ),
  ),
});

const user = {
  username: '1234',
  groups: ['test', '123', 'hello', 'test'],
  sshkey: 'hello',
};

const result = UserSchema.safeParse(user);

// const pretty = z.treeifyError(result.error!);

console.log(z.prettifyError(result.error!));

console.log(result.error.issues);
