'use strict';

const validate = require('./helper').validate;

module.exports = {
  validator(schema) {
    try {
      const { body, params, query, headers } = schema;
      if (body) this.request.body = validate(this.request.body, body);
      if (params) this.params = validate(this.params, params);
      if (query) this.query = validate(this.query, query);
      if (headers) Object.assign(this.headers, validate(this.headers, headers, { allowUnknown: true }));
    } catch (error) {
      this.throw(422, error);
    }
  },
};
