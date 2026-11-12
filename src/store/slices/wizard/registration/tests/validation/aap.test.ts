import { describe, expect, it } from 'vitest';

import {
  isValidUrl,
  validateMultipleCertificates,
} from '@/Components/CreateImageWizard/validators';

const validCertificate = `-----BEGIN CERTIFICATE-----
YWJj
-----END CERTIFICATE-----`;
const invalidCertificate = `-----BEGIN CERTIFICATE-----
not-base64!
-----END CERTIFICATE-----`;

describe('AAP validation', () => {
  describe('callback URL', () => {
    it.each([
      'https://controller.example.com/callback/',
      'http://controller.example.com/callback/',
    ])('accepts %s', (url) => {
      expect(isValidUrl(url)).toBe(true);
    });

    it.each(['', 'htt', 'ftp://controller.example.com', 'https://localhost'])(
      'rejects %s',
      (url) => {
        expect(isValidUrl(url)).toBe(false);
      },
    );
  });

  describe('certificate', () => {
    it('accepts a PEM certificate', () => {
      expect(validateMultipleCertificates(validCertificate)).toMatchObject({
        validCertificates: [validCertificate],
        errors: [],
      });
    });

    it('rejects a malformed PEM certificate', () => {
      expect(validateMultipleCertificates(invalidCertificate).errors).toEqual([
        'Certificate 1 is not valid. Must be in PEM/DER/CER format.',
      ]);
    });
  });
});
