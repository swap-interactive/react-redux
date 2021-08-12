"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createConnect = createConnect;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _connectAdvanced = _interopRequireDefault(require("../components/connectAdvanced"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _mapDispatchToProps = _interopRequireDefault(require("./mapDispatchToProps"));

var _mapStateToProps = _interopRequireDefault(require("./mapStateToProps"));

var _mergeProps = _interopRequireDefault(require("./mergeProps"));

var _selectorFactory = _interopRequireDefault(require("./selectorFactory"));

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
  connectHOC = _connectAdvanced.default,
  mapStateToPropsFactories = _mapStateToProps.default,
  mapDispatchToPropsFactories = _mapDispatchToProps.default,
  mergePropsFactories = _mergeProps.default,
  selectorFactory = _selectorFactory.default
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
      areOwnPropsEqual = _shallowEqual.default,
      areStatePropsEqual = _shallowEqual.default,
      areMergedPropsEqual = _shallowEqual.default
    } = _ref,
        extraOptions = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
    const initMapStateToProps = match(mapStateToProps, // @ts-ignore
    mapStateToPropsFactories, 'mapStateToProps');
    const initMapDispatchToProps = match(mapDispatchToProps, // @ts-ignore
    mapDispatchToPropsFactories, 'mapDispatchToProps');
    const initMergeProps = match(mergeProps, // @ts-ignore
    mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, (0, _extends2.default)({
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
var _default = connect;
exports.default = _default;