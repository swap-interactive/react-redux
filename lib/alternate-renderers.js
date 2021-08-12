"use strict";

exports.__esModule = true;
var _exportNames = {
  batch: true
};
exports.batch = void 0;

var _exports = require("./exports");

Object.keys(_exports).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _exports[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _exports[key];
    }
  });
});

var _batch = require("./utils/batch");

// For other renderers besides ReactDOM and React Native,
// use the default noop batch function
const batch = (0, _batch.getBatch)();
exports.batch = batch;