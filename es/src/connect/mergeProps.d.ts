import { Dispatch } from 'redux';
declare type MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps) => TMergedProps;
export declare function defaultMergeProps<TStateProps, TDispatchProps, TOwnProps>(stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps): TOwnProps & TStateProps & TDispatchProps;
interface InitMergeOptions {
    displayName: string;
    pure?: boolean;
    areMergedPropsEqual: (a: any, b: any) => boolean;
}
export declare function wrapMergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>): (dispatch: Dispatch, options: InitMergeOptions) => MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;
export declare function whenMergePropsIsFunction<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>): ((dispatch: Dispatch<import("redux").AnyAction>, options: InitMergeOptions) => MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>) | undefined;
export declare function whenMergePropsIsOmitted<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>): (() => typeof defaultMergeProps) | undefined;
declare const _default: readonly [typeof whenMergePropsIsFunction, typeof whenMergePropsIsOmitted];
export default _default;
