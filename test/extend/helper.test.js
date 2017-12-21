'use strict';

const assert = require('assert');
const Joi = require('joi');
const validate = require('../../app/extend/helper').validate;

describe('test/extend/helper.test.js', () => {
  describe('#validate', () => {
    it('should throw error when fail to validate', () => {
      const rule = Joi.string().email().required();
      const invalidEmail = 'exampleegg.com';
      try {
        validate(invalidEmail, rule);
      } catch (error) {
        assert((error instanceof Error) && /must be a valid email/.test(error) === true);
      }
    });

    it('should pass when success to validate', () => {
      const rule = Joi.string().email().required();
      const email = 'example@egg.com';
      const value = validate(email, rule);
      assert(value === email);
    });
  });
});
