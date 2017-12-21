'use strict';

const Joi = require('joi');

module.exports = {
  validate(data, rule, options) {
    const result = Joi.validate(data, rule, options);
    if (result.error) throw new Error(result.error.message);
    return result.value;
  },
};
