"use strict";

exports.__esModule = true;
var _exportNames = {
  batch: true
};
Object.defineProperty(exports, "batch", {
  enumerable: true,
  get: function () {
    return _reactBatchedUpdates.unstable_batchedUpdates;
  }
});

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

var _reactBatchedUpdates = require("./utils/reactBatchedUpdates");

var _batch = require("./utils/batch");

// Enable batched updates in our subscriptions for use
// with standard React renderers (ReactDOM, React Native)
(0, _batch.setBatch)(_reactBatchedUpdates.unstable_batchedUpdates);