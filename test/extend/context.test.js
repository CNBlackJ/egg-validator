'use strict';

const { app, mm, assert } = require('egg-mock/bootstrap');
const path = require('path');

describe('test/extend/context.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: path.join(__dirname, '../fixtures/validate_form'),
    });
    return app.ready();
  });

  after(() => {
    app.close();
  });

  describe('#GET', () => {
    it('should return error message with invalid params', () => {
      return app.httpRequest()
        .get('/users/a1')
        .expect(422);
    });

    it('should return error message with invalid query string', () => {
      return app.httpRequest()
        .get('/users/1?isAdmin=1')
        .expect(422);
    });

    it('should all pass', () => {
      return app.httpRequest()
        .get('/users/1')
        .expect(200);
    });
  });

  describe('#POST', () => {
    it('should return error message when age less than 18', () => {
      return app.httpRequest()
        .post('/users')
        .send({
          userName: 'test user',
          age: 17,
        })
        .expect(422);
    });

    it('should return error message when userName is empty', () => {
      return app.httpRequest()
        .post('/users')
        .send({
          userName: '',
          age: 18,
        })
        .expect(422);
    });

    it('should return error message when missing required header', () => {
      return app.httpRequest()
        .post('/users')
        .send({
          userName: 'test user',
          age: 18,
        })
        .expect(422);
    });

    it('should return default age when age does not exist', () => {
      return app.httpRequest()
        .post('/users')
        .set('egg-token', '74c0b450-e3a3-11e7-8011-fb9f0d899580')
        .send({
          userName: 'test user',
        })
        .expect(200)
        .expect(res => {
          assert(res.body.age === 18);
        });
    });
  });
});
