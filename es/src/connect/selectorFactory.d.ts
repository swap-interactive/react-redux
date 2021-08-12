import type { Dispatch, Action } from 'redux';
import type { DefaultRootState, EqualityFn } from '../types';
export declare type SelectorFactory<S, TProps, TOwnProps, TFactoryOptions> = (dispatch: Dispatch<Action>, factoryOptions: TFactoryOptions) => Selector<S, TProps, TOwnProps>;
export declare type Selector<S, TProps, TOwnProps = null> = TOwnProps extends null | undefined ? (state: S) => TProps : (state: S, ownProps: TOwnProps) => TProps;
export declare type MapStateToProps<TStateProps, TOwnProps, State = DefaultRootState> = (state: State, ownProps: TOwnProps) => TStateProps;
export declare type MapStateToPropsFactory<TStateProps, TOwnProps, State = DefaultRootState> = (initialState: State, ownProps: TOwnProps) => MapStateToProps<TStateProps, TOwnProps, State>;
export declare type MapStateToPropsParam<TStateProps, TOwnProps, State = DefaultRootState> = MapStateToPropsFactory<TStateProps, TOwnProps, State> | MapStateToProps<TStateProps, TOwnProps, State> | null | undefined;
export declare type MapDispatchToPropsFunction<TDispatchProps, TOwnProps> = (dispatch: Dispatch<Action>, ownProps: TOwnProps) => TDispatchProps;
export declare type MapDispatchToProps<TDispatchProps, TOwnProps> = MapDispatchToPropsFunction<TDispatchProps, TOwnProps> | TDispatchProps;
export declare type MapDispatchToPropsFactory<TDispatchProps, TOwnProps> = (dispatch: Dispatch<Action>, ownProps: TOwnProps) => MapDispatchToPropsFunction<TDispatchProps, TOwnProps>;
export declare type MapDispatchToPropsParam<TDispatchProps, TOwnProps> = MapDispatchToPropsFactory<TDispatchProps, TOwnProps> | MapDispatchToProps<TDispatchProps, TOwnProps>;
export declare type MapDispatchToPropsNonObject<TDispatchProps, TOwnProps> = MapDispatchToPropsFactory<TDispatchProps, TOwnProps> | MapDispatchToPropsFunction<TDispatchProps, TOwnProps>;
export declare type MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps) => TMergedProps;
export declare function impureFinalPropsSelectorFactory<TStateProps, TOwnProps, TDispatchProps, TMergedProps, State = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>, mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>, dispatch: Dispatch): (state: State, ownProps: TOwnProps) => TMergedProps;
interface PureSelectorFactoryComparisonOptions<TOwnProps, State = DefaultRootState> {
    areStatesEqual: EqualityFn<State>;
    areOwnPropsEqual: EqualityFn<TOwnProps>;
    areStatePropsEqual: EqualityFn<unknown>;
    pure?: boolean;
}
export declare function pureFinalPropsSelectorFactory<TStateProps, TOwnProps, TDispatchProps, TMergedProps, State = DefaultRootState>(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State> & {
    dependsOnOwnProps: boolean;
}, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> & {
    dependsOnOwnProps: boolean;
}, mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>, dispatch: Dispatch, { areStatesEqual, areOwnPropsEqual, areStatePropsEqual, }: PureSelectorFactoryComparisonOptions<TOwnProps, State>): (nextState: State, nextOwnProps: TOwnProps) => TMergedProps;
export interface SelectorFactoryOptions<TStateProps, TOwnProps, TDispatchProps, TMergedProps, State = DefaultRootState> extends PureSelectorFactoryComparisonOptions<TOwnProps, State> {
    initMapStateToProps: (dispatch: Dispatch, options: PureSelectorFactoryComparisonOptions<TOwnProps, State> & {
        displayName: string;
    }) => MapStateToPropsParam<TStateProps, TOwnProps, State>;
    initMapDispatchToProps: (dispatch: Dispatch, options: PureSelectorFactoryComparisonOptions<TOwnProps, State> & {
        displayName: string;
    }) => MapDispatchToPropsParam<TDispatchProps, TOwnProps>;
    initMergeProps: (dispatch: Dispatch, options: PureSelectorFactoryComparisonOptions<TOwnProps, State> & {
        displayName: string;
    }) => MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;
    displayName: string;
}
export default function finalPropsSelectorFactory<TStateProps, TOwnProps, TDispatchProps, TMergedProps, State = DefaultRootState>(dispatch: Dispatch<Action>, { initMapStateToProps, initMapDispatchToProps, initMergeProps, ...options }: SelectorFactoryOptions<TStateProps, TOwnProps, TDispatchProps, TMergedProps, State>): (nextState: State, nextOwnProps: TOwnProps) => TMergedProps;
export {};
