(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRedux = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, reactDom) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  const ReactReduxContext = /*#__PURE__*/React__default['default'].createContext(null);

  {
    ReactReduxContext.displayName = 'ReactRedux';
  }

  // Default to a dummy "batch" implementation that just runs the callback
  function defaultNoopBatch(callback) {
    callback();
  }

  let batch = defaultNoopBatch; // Allow injecting another batching function later

  const setBatch = newBatch => batch = newBatch; // Supply a getter just to skip dealing with ESM bindings

  const getBatch = () => batch;

  // well as nesting subscriptions of descendant components, so that we can ensure the
  // ancestor components re-render before descendants

  function createListenerCollection() {
    const batch = getBatch();
    let first = null;
    let last = null;
    return {
      clear() {
        first = null;
        last = null;
      },

      notify() {
        batch(() => {
          let listener = first;

          while (listener) {
            listener.callback();
            listener = listener.next;
          }
        });
      },

      get() {
        let listeners = [];
        let listener = first;

        while (listener) {
          listeners.push(listener);
          listener = listener.next;
        }

        return listeners;
      },

      subscribe(callback) {
        let isSubscribed = true;
        let listener = last = {
          callback,
          next: null,
          prev: last
        };

        if (listener.prev) {
          listener.prev.next = listener;
        } else {
          first = listener;
        }

        return function unsubscribe() {
          if (!isSubscribed || first === null) return;
          isSubscribed = false;

          if (listener.next) {
            listener.next.prev = listener.prev;
          } else {
            last = listener.prev;
          }

          if (listener.prev) {
            listener.prev.next = listener.next;
          } else {
            first = listener.next;
          }
        };
      }

    };
  }

  const nullListeners = {
    notify() {},

    get: () => []
  };
  function createSubscription(store, parentSub) {
    let unsubscribe;
    let listeners = nullListeners;

    function addNestedSub(listener) {
      trySubscribe();
      return listeners.subscribe(listener);
    }

    function notifyNestedSubs() {
      listeners.notify();
    }

    function handleChangeWrapper() {
      if (subscription.onStateChange) {
        subscription.onStateChange();
      }
    }

    function isSubscribed() {
      return Boolean(unsubscribe);
    }

    function trySubscribe() {
      if (!unsubscribe) {
        unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
        listeners = createListenerCollection();
      }
    }

    function tryUnsubscribe() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = undefined;
        listeners.clear();
        listeners = nullListeners;
      }
    }

    const subscription = {
      addNestedSub,
      notifyNestedSubs,
      handleChangeWrapper,
      isSubscribed,
      trySubscribe,
      tryUnsubscribe,
      getListeners: () => listeners
    };
    return subscription;
  }

  // To get around it, we can conditionally useEffect on the server (no-op) and
  // useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
  // subscription callback always has the selector from the latest render commit
  // available, otherwise a store update may happen between render and the effect,
  // which may cause missed updates; we also must ensure the store subscription
  // is created synchronously, otherwise a store update may occur before the
  // subscription is created and an inconsistent state may be observed

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  function Provider({
    store,
    context,
    children
  }) {
    const contextValue = React.useMemo(() => {
      const subscription = createSubscription(store);
      subscription.onStateChange = subscription.notifyNestedSubs;
      return {
        store,
        subscription
      };
    }, [store]);
    const previousState = React.useMemo(() => store.getState(), [store]);
    useIsomorphicLayoutEffect(() => {
      const {
        subscription
      } = contextValue;
      subscription.trySubscribe();

      if (previousState !== store.getState()) {
        subscription.notifyNestedSubs();
      }

      return () => {
        subscription.tryUnsubscribe();
        subscription.onStateChange = undefined;
      };
    }, [contextValue, previousState]);
    const Context = context || ReactReduxContext;
    return /*#__PURE__*/React__default['default'].createElement(Context.Provider, {
      value: contextValue
    }, children);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }

    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  });

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

  function getStatics(component) {
    // React v16.11 and below
    if (reactIs.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above


    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);

        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }

      var keys = getOwnPropertyNames(sourceComponent);

      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }

      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];

        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }

    return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  const _excluded$2 = ["getDisplayName", "methodName", "shouldHandleStateChanges", "forwardRef", "context"],
        _excluded2 = ["reactReduxForwardedRef"];

  const EMPTY_ARRAY = [null, 0];
  const NO_SUBSCRIPTION_ARRAY = [null, null];

  const stringifyComponent = Comp => {
    try {
      return JSON.stringify(Comp);
    } catch (err) {
      return String(Comp);
    }
  };

  function storeStateUpdatesReducer(state, action) {
    const [, updateCount] = state;
    return [action.payload, updateCount + 1];
  }

  function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
    useIsomorphicLayoutEffect(() => effectFunc(...effectArgs), dependencies);
  }

  function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs) {
    // We want to capture the wrapper props and child props we used for later comparisons
    lastWrapperProps.current = wrapperProps;
    lastChildProps.current = actualChildProps;
    renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

    if (childPropsFromStoreUpdate.current) {
      childPropsFromStoreUpdate.current = null;
      notifyNestedSubs();
    }
  }

  function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch) {
    // If we're not subscribed to the store, nothing to do here
    if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

    let didUnsubscribe = false;
    let lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

    const checkForUpdates = () => {
      if (didUnsubscribe) {
        // Don't run stale listeners.
        // Redux doesn't guarantee unsubscriptions happen until next dispatch.
        return;
      }

      const latestStoreState = store.getState();
      let newChildProps, error;

      try {
        // Actually run the selector with the most recent store state and wrapper props
        // to determine what the child props should be
        newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
      } catch (e) {
        error = e;
        lastThrownError = e;
      }

      if (!error) {
        lastThrownError = null;
      } // If the child props haven't changed, nothing to do here - cascade the subscription update


      if (newChildProps === lastChildProps.current) {
        if (!renderIsScheduled.current) {
          notifyNestedSubs();
        }
      } else {
        // Save references to the new child props.  Note that we track the "child props from store update"
        // as a ref instead of a useState/useReducer because we need a way to determine if that value has
        // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
        // forcing another re-render, which we don't want.
        lastChildProps.current = newChildProps;
        childPropsFromStoreUpdate.current = newChildProps;
        renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

        forceComponentUpdateDispatch({
          type: 'STORE_UPDATED',
          payload: {
            error
          }
        });
      }
    }; // Actually subscribe to the nearest connected ancestor (or store)


    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe(); // Pull data from the store after first render in case the store has
    // changed since we began.

    checkForUpdates();

    const unsubscribeWrapper = () => {
      didUnsubscribe = true;
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;

      if (lastThrownError) {
        // It's possible that we caught an error due to a bad mapState function, but the
        // parent re-rendered without this component and we're about to unmount.
        // This shouldn't happen as long as we do top-down subscriptions correctly, but
        // if we ever do those wrong, this throw will surface the error in our tests.
        // In that case, throw the error from here so it doesn't get lost.
        throw lastThrownError;
      }
    };

    return unsubscribeWrapper;
  }

  const initStateUpdates = () => EMPTY_ARRAY;

  function connectAdvanced(
  /*
    selectorFactory is a func that is responsible for returning the selector function used to
    compute new props from state, props, and dispatch. For example:
       export default connectAdvanced((dispatch, options) => (state, props) => ({
        thing: state.things[props.thingId],
        saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
      }))(YourComponent)
     Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
    outside of their selector as an optimization. Options passed to connectAdvanced are passed to
    the selectorFactory, along with displayName and WrappedComponent, as the second argument.
     Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
    props. Do not use connectAdvanced directly without memoizing results between calls to your
    selector, otherwise the Connect component will re-render on every state or props change.
  */
  selectorFactory, // options object:
  _ref = {}) {
    let {
      // the func used to compute this HOC's displayName from the wrapped component's displayName.
      // probably overridden by wrapper functions such as connect()
      getDisplayName = name => `ConnectAdvanced(${name})`,
      // shown in error messages
      // probably overridden by wrapper functions such as connect()
      methodName = 'connectAdvanced',
      // determines whether this HOC subscribes to store changes
      shouldHandleStateChanges = true,
      // use React's forwardRef to expose a ref of the wrapped component
      forwardRef = false,
      // the context consumer to use
      context = ReactReduxContext
    } = _ref,
        connectOptions = _objectWithoutPropertiesLoose(_ref, _excluded$2);

    const Context = context;

    /*
    return function wrapWithConnect<
      WC extends React.ComponentType<
        Matching<DispatchProp<AnyAction>, GetProps<WC>>
      >
    >(WrappedComponent: WC) {
      */
    const wrapWithConnect = WrappedComponent => {
      if (!reactIs.isValidElementType(WrappedComponent)) {
        throw new Error(`You must pass a component to the function returned by ` + `${methodName}. Instead received ${stringifyComponent(WrappedComponent)}`);
      }

      const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      const displayName = getDisplayName(wrappedComponentName);

      const selectorFactoryOptions = _extends({}, connectOptions, {
        getDisplayName,
        methodName,
        shouldHandleStateChanges,
        displayName,
        wrappedComponentName,
        WrappedComponent
      });

      const {
        pure
      } = connectOptions;

      function createChildSelector(store) {
        return selectorFactory(store.dispatch, selectorFactoryOptions);
      } // If we aren't running in "pure" mode, we don't want to memoize values.
      // To avoid conditionally calling hooks, we fall back to a tiny wrapper
      // that just executes the given callback immediately.


      const usePureOnlyMemo = pure ? React.useMemo : callback => callback();

      function ConnectFunction(props) {
        const [propsContext, reactReduxForwardedRef, wrapperProps] = React.useMemo(() => {
          // Distinguish between actual "data" props that were passed to the wrapper component,
          // and values needed to control behavior (forwarded refs, alternate context instances).
          // To maintain the wrapperProps object reference, memoize this destructuring.
          const {
            reactReduxForwardedRef
          } = props,
                wrapperProps = _objectWithoutPropertiesLoose(props, _excluded2);

          return [props.context, reactReduxForwardedRef, wrapperProps];
        }, [props]);
        const ContextToUse = React.useMemo(() => {
          // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
          // Memoize the check that determines which context instance we should use.
          return propsContext && propsContext.Consumer && // @ts-ignore
          reactIs.isContextConsumer( /*#__PURE__*/React__default['default'].createElement(propsContext.Consumer, null)) ? propsContext : Context;
        }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

        const contextValue = React.useContext(ContextToUse); // The store _must_ exist as either a prop or in context.
        // We'll check to see if it _looks_ like a Redux store first.
        // This allows us to pass through a `store` prop that is just a plain value.

        const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
        const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);

        if (!didStoreComeFromProps && !didStoreComeFromContext) {
          throw new Error(`Could not find "store" in the context of ` + `"${displayName}". Either wrap the root component in a <Provider>, ` + `or pass a custom React context provider to <Provider> and the corresponding ` + `React context consumer to ${displayName} in connect options.`);
        } // Based on the previous check, one of these must be true


        const store = didStoreComeFromProps ? props.store : contextValue.store;
        const childPropsSelector = React.useMemo(() => {
          // The child props selector needs the store reference as an input.
          // Re-create this selector whenever the store changes.
          return createChildSelector(store);
        }, [store]);
        const [subscription, notifyNestedSubs] = React.useMemo(() => {
          if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
          // connected to the store via props shouldn't use subscription from context, or vice versa.

          const subscription = createSubscription(store, didStoreComeFromProps ? undefined : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
          // the middle of the notification loop, where `subscription` will then be null. This can
          // probably be avoided if Subscription's listeners logic is changed to not call listeners
          // that have been unsubscribed in the  middle of the notification loop.

          const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
          return [subscription, notifyNestedSubs];
        }, [store, didStoreComeFromProps, contextValue]); // Determine what {store, subscription} value should be put into nested context, if necessary,
        // and memoize that value to avoid unnecessary context updates.

        const overriddenContextValue = React.useMemo(() => {
          if (didStoreComeFromProps) {
            // This component is directly subscribed to a store from props.
            // We don't want descendants reading from this store - pass down whatever
            // the existing context value is from the nearest connected ancestor.
            return contextValue;
          } // Otherwise, put this component's subscription instance into context, so that
          // connected descendants won't update until after this component is done


          return _extends({}, contextValue, {
            subscription
          });
        }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
        // causes a change to the calculated child component props (or we caught an error in mapState)

        const [[previousStateUpdateResult], forceComponentUpdateDispatch] = React.useReducer(storeStateUpdatesReducer, // @ts-ignore
        EMPTY_ARRAY, initStateUpdates); // Propagate any mapState/mapDispatch errors upwards

        if (previousStateUpdateResult && previousStateUpdateResult.error) {
          throw previousStateUpdateResult.error;
        } // Set up refs to coordinate values between the subscription effect and the render logic


        const lastChildProps = React.useRef();
        const lastWrapperProps = React.useRef(wrapperProps);
        const childPropsFromStoreUpdate = React.useRef();
        const renderIsScheduled = React.useRef(false);
        const actualChildProps = usePureOnlyMemo(() => {
          // Tricky logic here:
          // - This render may have been triggered by a Redux store update that produced new child props
          // - However, we may have gotten new wrapper props after that
          // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
          // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
          // So, we'll use the child props from store update only if the wrapper props are the same as last time.
          if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
            return childPropsFromStoreUpdate.current;
          } // TODO We're reading the store directly in render() here. Bad idea?
          // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
          // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
          // to determine what the child props should be.


          return childPropsSelector(store.getState(), wrapperProps);
        }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
        // about useLayoutEffect in SSR, so we try to detect environment and fall back to
        // just useEffect instead to avoid the warning, since neither will run anyway.

        useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs]); // Our re-subscribe logic only runs when the store/subscription setup changes

        useIsomorphicLayoutEffectWithArgs(subscribeUpdates, [shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch], [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
        // We memoize the elements for the rendered child component as an optimization.

        const renderedWrappedComponent = React.useMemo(() =>
        /*#__PURE__*/
        // @ts-ignore
        React__default['default'].createElement(WrappedComponent, _extends({}, actualChildProps, {
          ref: reactReduxForwardedRef
        })), [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
        // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

        const renderedChild = React.useMemo(() => {
          if (shouldHandleStateChanges) {
            // If this component is subscribed to store updates, we need to pass its own
            // subscription instance down to our descendants. That means rendering the same
            // Context instance, and putting a different value into the context.
            return /*#__PURE__*/React__default['default'].createElement(ContextToUse.Provider, {
              value: overriddenContextValue
            }, renderedWrappedComponent);
          }

          return renderedWrappedComponent;
        }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
        return renderedChild;
      } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.


      const _Connect = pure ? React__default['default'].memo(ConnectFunction) : ConnectFunction;

      const Connect = _Connect;
      Connect.WrappedComponent = WrappedComponent;
      Connect.displayName = ConnectFunction.displayName = displayName;

      if (forwardRef) {
        const _forwarded = React__default['default'].forwardRef(function forwardConnectRef(props, ref) {
          // @ts-ignore
          return /*#__PURE__*/React__default['default'].createElement(Connect, _extends({}, props, {
            reactReduxForwardedRef: ref
          }));
        });

        const forwarded = _forwarded;
        forwarded.displayName = displayName;
        forwarded.WrappedComponent = WrappedComponent;
        return hoistNonReactStatics_cjs(forwarded, WrappedComponent);
      }

      return hoistNonReactStatics_cjs(Connect, WrappedComponent);
    };

    return wrapWithConnect;
  }

  function is(x, y) {
    if (x === y) {
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }

  function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }

    return true;
  }

  function bindActionCreators(actionCreators, dispatch) {
    const boundActionCreators = {};

    for (const key in actionCreators) {
      const actionCreator = actionCreators[key];

      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
      }
    }

    return boundActionCreators;
  }

  /**
   * @param {any} obj The object to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   */
  function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    let proto = Object.getPrototypeOf(obj);
    if (proto === null) return true;
    let baseProto = proto;

    while (Object.getPrototypeOf(baseProto) !== null) {
      baseProto = Object.getPrototypeOf(baseProto);
    }

    return proto === baseProto;
  }

  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */
  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    /* eslint-enable no-console */


    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message);
      /* eslint-disable no-empty */
    } catch (e) {}
    /* eslint-enable no-empty */

  }

  function verifyPlainObject(value, displayName, methodName) {
    if (!isPlainObject(value)) {
      warning(`${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`);
    }
  }

  function wrapMapToPropsConstant( // * Note:
  //  It seems that the dispatch argument
  //  could be a dispatch function in some cases (ex: whenMapDispatchToPropsIsMissing)
  //  and a state object in some others (ex: whenMapStateToPropsIsMissing)
  // eslint-disable-next-line no-unused-vars
  getConstant) {
    return function initConstantSelector(dispatch) {
      const constant = getConstant(dispatch);

      function constantSelector() {
        return constant;
      }

      constantSelector.dependsOnOwnProps = false;
      return constantSelector;
    };
  } // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
  // to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
  // whether mapToProps needs to be invoked when props have changed.
  //
  // A length of one signals that mapToProps does not depend on props from the parent component.
  // A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
  // therefore not reporting its length accurately..

  function getDependsOnOwnProps(mapToProps) {
    return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
  } // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
  // this function wraps mapToProps in a proxy function which does several things:
  //
  //  * Detects whether the mapToProps function being called depends on props, which
  //    is used by selectorFactory to decide if it should reinvoke on props changes.
  //
  //  * On first call, handles mapToProps if returns another function, and treats that
  //    new function as the true mapToProps for subsequent calls.
  //
  //  * On first call, verifies the first result is a plain object, in order to warn
  //    the developer that their mapToProps function is not returning a valid result.
  //

  function wrapMapToPropsFunc(mapToProps, methodName) {
    return function initProxySelector(dispatch, {
      displayName
    }) {
      const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
        return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, undefined);
      }; // allow detectFactoryAndVerify to get ownProps


      proxy.dependsOnOwnProps = true;

      proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
        proxy.mapToProps = mapToProps;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
        let props = proxy(stateOrDispatch, ownProps);

        if (typeof props === 'function') {
          proxy.mapToProps = props;
          proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
          props = proxy(stateOrDispatch, ownProps);
        }

        verifyPlainObject(props, displayName, methodName);
        return props;
      };

      return proxy;
    };
  }

  function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
    return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
  }
  function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
    return !mapDispatchToProps ? wrapMapToPropsConstant(dispatch => ({
      dispatch
    })) : undefined;
  }
  function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
    return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(dispatch => bindActionCreators(mapDispatchToProps, dispatch)) : undefined;
  }
  var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

  function whenMapStateToPropsIsFunction(mapStateToProps) {
    return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
  }
  function whenMapStateToPropsIsMissing(mapStateToProps) {
    return !mapStateToProps ? wrapMapToPropsConstant(() => ({})) : undefined;
  }
  var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

  function defaultMergeProps(stateProps, dispatchProps, ownProps) {
    return _extends({}, ownProps, stateProps, dispatchProps);
  }
  function wrapMergePropsFunc(mergeProps) {
    return function initMergePropsProxy(dispatch, {
      displayName,
      pure,
      areMergedPropsEqual
    }) {
      let hasRunOnce = false;
      let mergedProps;
      return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
        const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

        if (hasRunOnce) {
          if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
        } else {
          hasRunOnce = true;
          mergedProps = nextMergedProps;
          verifyPlainObject(mergedProps, displayName, 'mergeProps');
        }

        return mergedProps;
      };
    };
  }
  function whenMergePropsIsFunction(mergeProps) {
    return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
  }
  function whenMergePropsIsOmitted(mergeProps) {
    return !mergeProps ? () => defaultMergeProps : undefined;
  }
  var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

  function verify(selector, methodName, displayName) {
    if (!selector) {
      throw new Error(`Unexpected value for ${methodName} in ${displayName}.`);
    } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
      if (!Object.prototype.hasOwnProperty.call(selector, 'dependsOnOwnProps')) {
        warning(`The selector for ${methodName} of ${displayName} did not specify a value for dependsOnOwnProps.`);
      }
    }
  }

  function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
    verify(mapStateToProps, 'mapStateToProps', displayName);
    verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
    verify(mergeProps, 'mergeProps', displayName);
  }

  const _excluded$1 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
  function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
    return function impureFinalPropsSelector(state, ownProps) {
      return mergeProps( // @ts-ignore
      mapStateToProps(state, ownProps), // @ts-ignore
      mapDispatchToProps(dispatch, ownProps), ownProps);
    };
  }
  function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, {
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual
  }) {
    let hasRunAtLeastOnce = false;
    let state;
    let ownProps;
    let stateProps;
    let dispatchProps;
    let mergedProps;

    function handleFirstCall(firstState, firstOwnProps) {
      state = firstState;
      ownProps = firstOwnProps; // @ts-ignore

      stateProps = mapStateToProps(state, ownProps); // @ts-ignore

      dispatchProps = mapDispatchToProps(dispatch, ownProps);
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      hasRunAtLeastOnce = true;
      return mergedProps;
    }

    function handleNewPropsAndNewState() {
      // @ts-ignore
      stateProps = mapStateToProps(state, ownProps);
      if (mapDispatchToProps.dependsOnOwnProps) // @ts-ignore
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      return mergedProps;
    }

    function handleNewProps() {
      if (mapStateToProps.dependsOnOwnProps) // @ts-ignore
        stateProps = mapStateToProps(state, ownProps);
      if (mapDispatchToProps.dependsOnOwnProps) // @ts-ignore
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      return mergedProps;
    }

    function handleNewState() {
      const nextStateProps = mapStateToProps(state, ownProps);
      const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps); // @ts-ignore

      stateProps = nextStateProps;
      if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      return mergedProps;
    }

    function handleSubsequentCalls(nextState, nextOwnProps) {
      const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
      const stateChanged = !areStatesEqual(nextState, state);
      state = nextState;
      ownProps = nextOwnProps;
      if (propsChanged && stateChanged) return handleNewPropsAndNewState();
      if (propsChanged) return handleNewProps();
      if (stateChanged) return handleNewState();
      return mergedProps;
    }

    return function pureFinalPropsSelector(nextState, nextOwnProps) {
      return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
    };
  }
  // TODO: Add more comments
  // If pure is true, the selector returned by selectorFactory will memoize its results,
  // allowing connectAdvanced's shouldComponentUpdate to return false if final
  // props have not changed. If false, the selector will always return a new
  // object and shouldComponentUpdate will always return true.
  function finalPropsSelectorFactory(dispatch, _ref) {
    let {
      initMapStateToProps,
      initMapDispatchToProps,
      initMergeProps
    } = _ref,
        options = _objectWithoutPropertiesLoose(_ref, _excluded$1);

    const mapStateToProps = initMapStateToProps(dispatch, options);
    const mapDispatchToProps = initMapDispatchToProps(dispatch, options);
    const mergeProps = initMergeProps(dispatch, options);

    {
      verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
    }

    const selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
    return selectorFactory( // @ts-ignore
    mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
  }

  const _excluded = ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"];

  /*
    connect is a facade over connectAdvanced. It turns its args into a compatible
    selectorFactory, which has the signature:

      (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
    
    connect passes its args to connectAdvanced as options, which will in turn pass them to
    selectorFactory each time a Connect component instance is instantiated or hot reloaded.

    selectorFactory returns a final props selector from its mapStateToProps,
    mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
    mergePropsFactories, and pure args.

    The resulting final props selector is called by the Connect component instance whenever
    it receives new props or store state.
   */
  function match(arg, factories, name) {
    for (let i = factories.length - 1; i >= 0; i--) {
      const result = factories[i](arg);
      if (result) return result;
    }

    return (dispatch, options) => {
      throw new Error(`Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`);
    };
  }

  function strictEqual(a, b) {
    return a === b;
  }
  /**
   * Infers the type of props that a connector will inject into a component.
   */


  /*
  export interface Connect<DefaultState = DefaultRootState> {
    // tslint:disable:no-unnecessary-generics
    (): InferableComponentEnhancer<DispatchProp>

    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>
    ): InferableComponentEnhancerWithProps<TStateProps & DispatchProp, TOwnProps>

    <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>

    <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
      ResolveThunks<TDispatchProps>,
      TOwnProps
    >

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
      TStateProps & TDispatchProps,
      TOwnProps
    >

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
      TStateProps & ResolveThunks<TDispatchProps>,
      TOwnProps
    >

    <no_state = {}, no_dispatch = {}, TOwnProps = {}, TMergedProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: null | undefined,
      mergeProps: MergeProps<undefined, undefined, TOwnProps, TMergedProps>
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>

    <
      TStateProps = {},
      no_dispatch = {},
      TOwnProps = {},
      TMergedProps = {},
      State = DefaultState
    >(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: null | undefined,
      mergeProps: MergeProps<TStateProps, undefined, TOwnProps, TMergedProps>
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>

    <no_state = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
      mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>

    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: null | undefined,
      mergeProps: null | undefined,
      options: ConnectOptions<State, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<DispatchProp & TStateProps, TOwnProps>

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
      mergeProps: null | undefined,
      options: ConnectOptions<{}, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
      mergeProps: null | undefined,
      options: ConnectOptions<{}, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
      ResolveThunks<TDispatchProps>,
      TOwnProps
    >

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
      mergeProps: null | undefined,
      options: ConnectOptions<State, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
      TStateProps & TDispatchProps,
      TOwnProps
    >

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
      mergeProps: null | undefined,
      options: ConnectOptions<State, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
      TStateProps & ResolveThunks<TDispatchProps>,
      TOwnProps
    >

    <
      TStateProps = {},
      TDispatchProps = {},
      TOwnProps = {},
      TMergedProps = {},
      State = DefaultState
    >(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
      mergeProps: MergeProps<
        TStateProps,
        TDispatchProps,
        TOwnProps,
        TMergedProps
      >,
      options?: ConnectOptions<State, TStateProps, TOwnProps, TMergedProps>
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>
    // tslint:enable:no-unnecessary-generics
  }
  */
  // createConnect with default args builds the 'official' connect behavior. Calling it with
  // different options opens up some testing and extensibility scenarios
  function createConnect({
    connectHOC = connectAdvanced,
    mapStateToPropsFactories = defaultMapStateToPropsFactories,
    mapDispatchToPropsFactories = defaultMapDispatchToPropsFactories,
    mergePropsFactories = defaultMergePropsFactories,
    selectorFactory = finalPropsSelectorFactory
  } = {}) {
    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */
    // @ts-ignore

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /* @public */

    /**
     * Connects a React component to a Redux store.
     *
     * - Without arguments, just wraps the component, without changing the behavior / props
     *
     * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
     * is to override ownProps (as stated in the docs), so what remains is everything that's
     * not a state or dispatch prop
     *
     * - When 3rd param is passed, we don't know if ownProps propagate and whether they
     * should be valid component props, because it depends on mergeProps implementation.
     * As such, it is the user's responsibility to extend ownProps interface from state or
     * dispatch props or both when applicable
     *
     * @param mapStateToProps A function that extracts values from state
     * @param mapDispatchToProps Setup for dispatching actions
     * @param mergeProps Optional callback to merge state and dispatch props together
     * @param options Options for configuring the connection
     *
     */
    function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref = {}) {
      let {
        pure = true,
        areStatesEqual = strictEqual,
        areOwnPropsEqual = shallowEqual,
        areStatePropsEqual = shallowEqual,
        areMergedPropsEqual = shallowEqual
      } = _ref,
          extraOptions = _objectWithoutPropertiesLoose(_ref, _excluded);

      const initMapStateToProps = match(mapStateToProps, // @ts-ignore
      mapStateToPropsFactories, 'mapStateToProps');
      const initMapDispatchToProps = match(mapDispatchToProps, // @ts-ignore
      mapDispatchToPropsFactories, 'mapDispatchToProps');
      const initMergeProps = match(mergeProps, // @ts-ignore
      mergePropsFactories, 'mergeProps');
      return connectHOC(selectorFactory, _extends({
        // used in error messages
        methodName: 'connect',
        // used to compute Connect's displayName from the wrapped component's displayName.
        getDisplayName: name => `Connect(${name})`,
        // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
        shouldHandleStateChanges: Boolean(mapStateToProps),
        // passed through to selectorFactory
        initMapStateToProps,
        initMapDispatchToProps,
        initMergeProps,
        pure,
        areStatesEqual,
        areOwnPropsEqual,
        areStatePropsEqual,
        areMergedPropsEqual
      }, extraOptions));
    }

    return connect;
  }
  /* @public */

  const connect = /*#__PURE__*/createConnect();

  /**
   * A hook to access the value of the `ReactReduxContext`. This is a low-level
   * hook that you should usually not need to call directly.
   *
   * @returns {any} the value of the `ReactReduxContext`
   *
   * @example
   *
   * import React from 'react'
   * import { useReduxContext } from 'react-redux'
   *
   * export const CounterComponent = ({ value }) => {
   *   const { store } = useReduxContext()
   *   return <div>{store.getState()}</div>
   * }
   */
  function useReduxContext() {
    const contextValue = React.useContext(ReactReduxContext);

    if (!contextValue) {
      throw new Error('could not find react-redux context value; please ensure the component is wrapped in a <Provider>');
    }

    return contextValue;
  }

  /**
   * Hook factory, which creates a `useStore` hook bound to a given context.
   *
   * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
   * @returns {Function} A `useStore` hook bound to the specified context.
   */

  function createStoreHook(context = ReactReduxContext) {
    const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : () => React.useContext(context);
    return function useStore() {
      const {
        store
      } = useReduxContext$1();
      return store;
    };
  }
  /**
   * A hook to access the redux store.
   *
   * @returns {any} the redux store
   *
   * @example
   *
   * import React from 'react'
   * import { useStore } from 'react-redux'
   *
   * export const ExampleComponent = () => {
   *   const store = useStore()
   *   return <div>{store.getState()}</div>
   * }
   */

  const useStore = /*#__PURE__*/createStoreHook();

  /**
   * Hook factory, which creates a `useDispatch` hook bound to a given context.
   *
   * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
   * @returns {Function} A `useDispatch` hook bound to the specified context.
   */

  function createDispatchHook(context = ReactReduxContext) {
    const useStore$1 = context === ReactReduxContext ? useStore : createStoreHook(context);
    return function useDispatch() {
      const store = useStore$1();
      return store.dispatch;
    };
  }
  /**
   * A hook to access the redux `dispatch` function.
   *
   * @returns {any|function} redux store's `dispatch` function
   *
   * @example
   *
   * import React, { useCallback } from 'react'
   * import { useDispatch } from 'react-redux'
   *
   * export const CounterComponent = ({ value }) => {
   *   const dispatch = useDispatch()
   *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
   *   return (
   *     <div>
   *       <span>{value}</span>
   *       <button onClick={increaseCounter}>Increase counter</button>
   *     </div>
   *   )
   * }
   */

  const useDispatch = /*#__PURE__*/createDispatchHook();

  const refEquality = (a, b) => a === b;

  function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
    const [, forceRender] = React.useReducer(s => s + 1, 0);
    const subscription = React.useMemo(() => createSubscription(store, contextSub), [store, contextSub]);
    const latestSubscriptionCallbackError = React.useRef();
    const latestSelector = React.useRef();
    const latestStoreState = React.useRef();
    const latestSelectedState = React.useRef();
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
        err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`;
      }

      throw err;
    }

    useIsomorphicLayoutEffect(() => {
      latestSelector.current = selector;
      latestStoreState.current = storeState;
      latestSelectedState.current = selectedState;
      latestSubscriptionCallbackError.current = undefined;
    });
    useIsomorphicLayoutEffect(() => {
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


  function createSelectorHook(context = ReactReduxContext) {
    const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : () => React.useContext(context);
    return function useSelector(selector, equalityFn = refEquality) {
      {
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
      } = useReduxContext$1();
      const selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
      React.useDebugValue(selectedState);
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

  // with standard React renderers (ReactDOM, React Native)

  setBatch(reactDom.unstable_batchedUpdates);

  Object.defineProperty(exports, 'batch', {
    enumerable: true,
    get: function () {
      return reactDom.unstable_batchedUpdates;
    }
  });
  exports.Provider = Provider;
  exports.ReactReduxContext = ReactReduxContext;
  exports.connect = connect;
  exports.connectAdvanced = connectAdvanced;
  exports.createDispatchHook = createDispatchHook;
  exports.createSelectorHook = createSelectorHook;
  exports.createStoreHook = createStoreHook;
  exports.shallowEqual = shallowEqual;
  exports.useDispatch = useDispatch;
  exports.useSelector = useSelector;
  exports.useStore = useStore;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
