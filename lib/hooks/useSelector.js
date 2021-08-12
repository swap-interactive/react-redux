"use strict";

exports.__esModule = true;
exports.createSelectorHook = createSelectorHook;
exports.useSelector = void 0;

var _react = require("react");

var _useReduxContext = require("./useReduxContext");

var _Subscription = require("../utils/Subscription");

var _useIsomorphicLayoutEffect = require("../utils/useIsomorphicLayoutEffect");

var _Context = require("../components/Context");

const refEquality = (a, b) => a === b;

function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  const [, forceRender] = (0, _react.useReducer)(s => s + 1, 0);
  const subscription = (0, _react.useMemo)(() => (0, _Subscription.createSubscription)(store, contextSub), [store, contextSub]);
  const latestSubscriptionCallbackError = (0, _react.useRef)();
  const latestSelector = (0, _react.useRef)();
  const latestStoreState = (0, _react.useRef)();
  const latestSelectedState = (0, _react.useRef)();
  const storeState = store.getState();
  let selectedState;

  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      const newSelectedState = selector(storeState); // ensure latest selected state is reused so that a custom equality function can result in identical references

      if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      ;
      err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`;
    }

    throw err;
  }

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(() => {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(() => {
    function checkForUpdates() {
      try {
        const newStoreState = store.getState();
        const newSelectedState = latestSelector.current(newStoreState);

        if (equalityFn(newSelectedState, latestSelectedState.current)) {
          return;
        }

        latestSelectedState.current = newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err;
      }

      forceRender();
    }

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return () => subscription.tryUnsubscribe();
  }, [store, subscription]);
  return selectedState;
}
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context = _Context.ReactReduxContext) {
  const useReduxContext = context === _Context.ReactReduxContext ? _useReduxContext.useReduxContext : () => (0, _react.useContext)(context);
  return function useSelector(selector, equalityFn = refEquality) {
    if (process.env.NODE_ENV !== 'production') {
      if (!selector) {
        throw new Error(`You must pass a selector to useSelector`);
      }

      if (typeof selector !== 'function') {
        throw new Error(`You must pass a function as a selector to useSelector`);
      }

      if (typeof equalityFn !== 'function') {
        throw new Error(`You must pass a function as an equality function to useSelector`);
      }
    }

    const {
      store,
      subscription: contextSub
    } = useReduxContext();
    const selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
    (0, _react.useDebugValue)(selectedState);
    return selectedState;
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */


const useSelector = /*#__PURE__*/createSelectorHook();
exports.useSelector = useSelector;