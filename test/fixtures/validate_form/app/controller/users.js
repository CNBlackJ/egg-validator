'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');

class UsersController extends Controller {
  async show() {
    const { ctx } = this;
    ctx.validator({
      params: Joi.object().keys({
        id: Joi.number().required(),
      }),
      query: Joi.object().keys({
        isAdmin: Joi.boolean().optional(),
      }),
    });
    const { id } = ctx.params;
    ctx.body = { id, name: 'test user' };
  }

  async create() {
    const { ctx } = this;
    ctx.validator({
      body: Joi.object().keys({
        userName: Joi.string().required(),
        age: Joi.number().min(18).default(18),
      }),
      headers: Joi.object().keys({
        'egg-token': Joi.string().guid().required(),
      }),
    });
    const body = ctx.request.body;
    ctx.body = body;
  }
}

module.exports = UsersController;
