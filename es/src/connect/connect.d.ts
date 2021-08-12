import type { AnyAction } from 'redux';
import connectAdvanced from '../components/connectAdvanced';
import type { ConnectAdvancedOptions } from '../components/connectAdvanced';
import defaultSelectorFactory, { MapStateToPropsParam, MapDispatchToPropsParam, MergeProps, MapDispatchToPropsNonObject } from './selectorFactory';
import type { DefaultRootState, InferableComponentEnhancer, InferableComponentEnhancerWithProps, ResolveThunks, DispatchProp } from '../types';
/**
 * Infers the type of props that a connector will inject into a component.
 */
export declare type ConnectedProps<TConnector> = TConnector extends InferableComponentEnhancerWithProps<infer TInjectedProps, any> ? unknown extends TInjectedProps ? TConnector extends InferableComponentEnhancer<infer TInjectedProps> ? TInjectedProps : never : TInjectedProps : never;
export interface ConnectOptions<State = DefaultRootState, TStateProps = {}, TOwnProps = {}, TMergedProps = {}> extends ConnectAdvancedOptions {
    pure?: boolean | undefined;
    areStatesEqual?: ((nextState: State, prevState: State) => boolean) | undefined;
    areOwnPropsEqual?: (nextOwnProps: TOwnProps, prevOwnProps: TOwnProps) => boolean;
    areStatePropsEqual?: (nextStateProps: TStateProps, prevStateProps: TStateProps) => boolean;
    areMergedPropsEqual?: (nextMergedProps: TMergedProps, prevMergedProps: TMergedProps) => boolean;
    forwardRef?: boolean | undefined;
}
export declare function createConnect({ connectHOC, mapStateToPropsFactories, mapDispatchToPropsFactories, mergePropsFactories, selectorFactory, }?: {
    connectHOC?: typeof connectAdvanced | undefined;
    mapStateToPropsFactories?: (typeof import("./mapStateToProps").whenMapStateToPropsIsFunction | typeof import("./mapStateToProps").whenMapStateToPropsIsMissing)[] | undefined;
    mapDispatchToPropsFactories?: (typeof import("./mapDispatchToProps").whenMapDispatchToPropsIsFunction | typeof import("./mapDispatchToProps").whenMapDispatchToPropsIsMissing | typeof import("./mapDispatchToProps").whenMapDispatchToPropsIsObject)[] | undefined;
    mergePropsFactories?: readonly [typeof import("./mergeProps").whenMergePropsIsFunction, typeof import("./mergeProps").whenMergePropsIsOmitted] | undefined;
    selectorFactory?: typeof defaultSelectorFactory | undefined;
}): {
    (): InferableComponentEnhancer<DispatchProp>;
    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>): InferableComponentEnhancerWithProps<TStateProps & DispatchProp<AnyAction>, TOwnProps>;
    <no_state = {}, TDispatchProps = {}, TOwnProps_1 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps_1>): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps_1>;
    <no_state_1 = {}, TDispatchProps_1 = {}, TOwnProps_2 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_1, TOwnProps_2>): InferableComponentEnhancerWithProps<ResolveThunks<TDispatchProps_1>, TOwnProps_2>;
    <TStateProps_1 = {}, TDispatchProps_2 = {}, TOwnProps_3 = {}, State_1 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_1, TOwnProps_3, State_1>, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps_2, TOwnProps_3>): InferableComponentEnhancerWithProps<TStateProps_1 & TDispatchProps_2, TOwnProps_3>;
    <TStateProps_2 = {}, TDispatchProps_3 = {}, TOwnProps_4 = {}, State_2 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_2, TOwnProps_4, State_2>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_3, TOwnProps_4>): InferableComponentEnhancerWithProps<TStateProps_2 & ResolveThunks<TDispatchProps_3>, TOwnProps_4>;
    <no_state_2 = {}, no_dispatch_1 = {}, TOwnProps_5 = {}, TMergedProps = {}>(mapStateToProps: null | undefined, mapDispatchToProps: null | undefined, mergeProps: MergeProps<undefined, undefined, TOwnProps_5, TMergedProps>): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps_5>;
    <TStateProps_3 = {}, no_dispatch_2 = {}, TOwnProps_6 = {}, TMergedProps_1 = {}, State_3 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_3, TOwnProps_6, State_3>, mapDispatchToProps: null | undefined, mergeProps: MergeProps<TStateProps_3, undefined, TOwnProps_6, TMergedProps_1>): InferableComponentEnhancerWithProps<TMergedProps_1, TOwnProps_6>;
    <no_state_3 = {}, TDispatchProps_4 = {}, TOwnProps_7 = {}, TMergedProps_2 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_4, TOwnProps_7>, mergeProps: MergeProps<undefined, TDispatchProps_4, TOwnProps_7, TMergedProps_2>): InferableComponentEnhancerWithProps<TMergedProps_2, TOwnProps_7>;
    <TStateProps_4 = {}, no_dispatch_3 = {}, TOwnProps_8 = {}, State_4 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_4, TOwnProps_8, State_4>, mapDispatchToProps: null | undefined, mergeProps: null | undefined, options: ConnectOptions<State_4, TStateProps_4, TOwnProps_8, {}>): InferableComponentEnhancerWithProps<DispatchProp<AnyAction> & TStateProps_4, TOwnProps_8>;
    <TStateProps_5 = {}, TDispatchProps_5 = {}, TOwnProps_9 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps_5, TOwnProps_9>, mergeProps: null | undefined, options: ConnectOptions<{}, TStateProps_5, TOwnProps_9, {}>): InferableComponentEnhancerWithProps<TDispatchProps_5, TOwnProps_9>;
    <TStateProps_6 = {}, TDispatchProps_6 = {}, TOwnProps_10 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_6, TOwnProps_10>, mergeProps: null | undefined, options: ConnectOptions<{}, TStateProps_6, TOwnProps_10, {}>): InferableComponentEnhancerWithProps<ResolveThunks<TDispatchProps_6>, TOwnProps_10>;
    <TStateProps_7 = {}, TDispatchProps_7 = {}, TOwnProps_11 = {}, State_5 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_7, TOwnProps_11, State_5>, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps_7, TOwnProps_11>, mergeProps: null | undefined, options: ConnectOptions<State_5, TStateProps_7, TOwnProps_11, {}>): InferableComponentEnhancerWithProps<TStateProps_7 & TDispatchProps_7, TOwnProps_11>;
    <TStateProps_8 = {}, TDispatchProps_8 = {}, TOwnProps_12 = {}, State_6 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_8, TOwnProps_12, State_6>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_8, TOwnProps_12>, mergeProps: null | undefined, options: ConnectOptions<State_6, TStateProps_8, TOwnProps_12, {}>): InferableComponentEnhancerWithProps<TStateProps_8 & ResolveThunks<TDispatchProps_8>, TOwnProps_12>;
    <TStateProps_9 = {}, TDispatchProps_9 = {}, TOwnProps_13 = {}, TMergedProps_3 = {}, State_7 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_9, TOwnProps_13, State_7>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_9, TOwnProps_13>, mergeProps: MergeProps<TStateProps_9, TDispatchProps_9, TOwnProps_13, TMergedProps_3>, options?: ConnectOptions<State_7, TStateProps_9, TOwnProps_13, TMergedProps_3> | undefined): InferableComponentEnhancerWithProps<TMergedProps_3, TOwnProps_13>;
};
declare const connect: {
    (): InferableComponentEnhancer<DispatchProp>;
    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>): InferableComponentEnhancerWithProps<TStateProps & DispatchProp<AnyAction>, TOwnProps>;
    <no_state = {}, TDispatchProps = {}, TOwnProps_1 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps_1>): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps_1>;
    <no_state_1 = {}, TDispatchProps_1 = {}, TOwnProps_2 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_1, TOwnProps_2>): InferableComponentEnhancerWithProps<ResolveThunks<TDispatchProps_1>, TOwnProps_2>;
    <TStateProps_1 = {}, TDispatchProps_2 = {}, TOwnProps_3 = {}, State_1 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_1, TOwnProps_3, State_1>, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps_2, TOwnProps_3>): InferableComponentEnhancerWithProps<TStateProps_1 & TDispatchProps_2, TOwnProps_3>;
    <TStateProps_2 = {}, TDispatchProps_3 = {}, TOwnProps_4 = {}, State_2 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_2, TOwnProps_4, State_2>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_3, TOwnProps_4>): InferableComponentEnhancerWithProps<TStateProps_2 & ResolveThunks<TDispatchProps_3>, TOwnProps_4>;
    <no_state_2 = {}, no_dispatch_1 = {}, TOwnProps_5 = {}, TMergedProps = {}>(mapStateToProps: null | undefined, mapDispatchToProps: null | undefined, mergeProps: MergeProps<undefined, undefined, TOwnProps_5, TMergedProps>): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps_5>;
    <TStateProps_3 = {}, no_dispatch_2 = {}, TOwnProps_6 = {}, TMergedProps_1 = {}, State_3 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_3, TOwnProps_6, State_3>, mapDispatchToProps: null | undefined, mergeProps: MergeProps<TStateProps_3, undefined, TOwnProps_6, TMergedProps_1>): InferableComponentEnhancerWithProps<TMergedProps_1, TOwnProps_6>;
    <no_state_3 = {}, TDispatchProps_4 = {}, TOwnProps_7 = {}, TMergedProps_2 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_4, TOwnProps_7>, mergeProps: MergeProps<undefined, TDispatchProps_4, TOwnProps_7, TMergedProps_2>): InferableComponentEnhancerWithProps<TMergedProps_2, TOwnProps_7>;
    <TStateProps_4 = {}, no_dispatch_3 = {}, TOwnProps_8 = {}, State_4 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_4, TOwnProps_8, State_4>, mapDispatchToProps: null | undefined, mergeProps: null | undefined, options: ConnectOptions<State_4, TStateProps_4, TOwnProps_8, {}>): InferableComponentEnhancerWithProps<DispatchProp<AnyAction> & TStateProps_4, TOwnProps_8>;
    <TStateProps_5 = {}, TDispatchProps_5 = {}, TOwnProps_9 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps_5, TOwnProps_9>, mergeProps: null | undefined, options: ConnectOptions<{}, TStateProps_5, TOwnProps_9, {}>): InferableComponentEnhancerWithProps<TDispatchProps_5, TOwnProps_9>;
    <TStateProps_6 = {}, TDispatchProps_6 = {}, TOwnProps_10 = {}>(mapStateToProps: null | undefined, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_6, TOwnProps_10>, mergeProps: null | undefined, options: ConnectOptions<{}, TStateProps_6, TOwnProps_10, {}>): InferableComponentEnhancerWithProps<ResolveThunks<TDispatchProps_6>, TOwnProps_10>;
    <TStateProps_7 = {}, TDispatchProps_7 = {}, TOwnProps_11 = {}, State_5 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_7, TOwnProps_11, State_5>, mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps_7, TOwnProps_11>, mergeProps: null | undefined, options: ConnectOptions<State_5, TStateProps_7, TOwnProps_11, {}>): InferableComponentEnhancerWithProps<TStateProps_7 & TDispatchProps_7, TOwnProps_11>;
    <TStateProps_8 = {}, TDispatchProps_8 = {}, TOwnProps_12 = {}, State_6 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_8, TOwnProps_12, State_6>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_8, TOwnProps_12>, mergeProps: null | undefined, options: ConnectOptions<State_6, TStateProps_8, TOwnProps_12, {}>): InferableComponentEnhancerWithProps<TStateProps_8 & ResolveThunks<TDispatchProps_8>, TOwnProps_12>;
    <TStateProps_9 = {}, TDispatchProps_9 = {}, TOwnProps_13 = {}, TMergedProps_3 = {}, State_7 = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps_9, TOwnProps_13, State_7>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps_9, TOwnProps_13>, mergeProps: MergeProps<TStateProps_9, TDispatchProps_9, TOwnProps_13, TMergedProps_3>, options?: ConnectOptions<State_7, TStateProps_9, TOwnProps_13, TMergedProps_3> | undefined): InferableComponentEnhancerWithProps<TMergedProps_3, TOwnProps_13>;
};
export default connect;
