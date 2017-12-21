'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/users/:id', controller.users.show);
  router.post('/users', controller.users.create);
};
