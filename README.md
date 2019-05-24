# egg-validator

[![Build Status](https://www.travis-ci.org/CNBlackJ/egg-validator.svg?branch=master)](https://www.travis-ci.org/CNBlackJ/egg-validator)
[![codecov](https://codecov.io/gh/CNBlackJ/egg-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/CNBlackJ/egg-validator)

基于[joi](https://github.com/hapijs/joi)开发的eggjs请求参数验证插件。

## Installation

- use npm

```bash
$ npm i egg-joi-validate --save
```

- use yarn

```bash
$ yarn add egg-joi-validate --S
```


## Usage

- eggjs插件开启

```js
// {app_root}/config/plugin.js
module.exports = {
  ...
  validator: {
    enable: true,
    package: 'egg-joi-validate'
  }
  ...
}

```

- controller中使用

```js
const { ctx } = this
ctx.validator({
  params: joi.object().keys({
    id: joi.number().required()
  }),
  body: joi.object().keys({
    name: joi.string()
  }),
  headers: joi.object().keys({
  	'x-user-id': joi.string().required()
  })
})
```