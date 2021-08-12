import { ClassAttributes, ComponentClass, ComponentType } from 'react';
import { Action, AnyAction, Dispatch } from 'redux';
import type { NonReactStatics } from 'hoist-non-react-statics';
export declare type FixTypeLater = any;
export declare type EqualityFn<T> = (a: T | undefined, b: T | undefined) => boolean;
/**
 * This interface can be augmented by users to add default types for the root state when
 * using `react-redux`.
 * Use module augmentation to append your own type definition in a your_custom_type.d.ts file.
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
export interface DefaultRootState {
}
export declare type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;
export declare type RootStateOrAny = AnyIfEmpty<DefaultRootState>;
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
export interface DispatchProp<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}
export declare type AdvancedComponentDecorator<TProps, TOwnProps> = (component: ComponentType<TProps>) => ComponentType<TOwnProps>;
/**
 * A property P will be present if:
 * - it is present in DecorationTargetProps
 *
 * Its value will be dependent on the following conditions
 * - if property P is present in InjectedProps and its definition extends the definition
 *   in DecorationTargetProps, then its definition will be that of DecorationTargetProps[P]
 * - if property P is not present in InjectedProps then its definition will be that of
 *   DecorationTargetProps[P]
 * - if property P is present in InjectedProps but does not extend the
 *   DecorationTargetProps[P] definition, its definition will be that of InjectedProps[P]
 */
export declare type Matching<InjectedProps, DecorationTargetProps> = {
    [P in keyof DecorationTargetProps]: P extends keyof InjectedProps ? InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : InjectedProps[P] : DecorationTargetProps[P];
};
/**
 * a property P will be present if :
 * - it is present in both DecorationTargetProps and InjectedProps
 * - InjectedProps[P] can satisfy DecorationTargetProps[P]
 * ie: decorated component can accept more types than decorator is injecting
 *
 * For decoration, inject props or ownProps are all optionally
 * required by the decorated (right hand side) component.
 * But any property required by the decorated component must be satisfied by the injected property.
 */
export declare type Shared<InjectedProps, DecorationTargetProps> = {
    [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]?: InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : never;
};
export declare type GetProps<C> = C extends ComponentType<infer P> ? C extends ComponentClass<P> ? ClassAttributes<InstanceType<C>> & P : P : never;
export declare type ConnectedComponent<C extends ComponentType<any>, P> = ComponentType<P> & NonReactStatics<C> & {
    WrappedComponent: C;
};
export declare type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>>(component: C) => ConnectedComponent<C, DistributiveOmit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps>;
export declare type InferableComponentEnhancer<TInjectedProps> = InferableComponentEnhancerWithProps<TInjectedProps, {}>;
export declare type InferThunkActionCreatorType<TActionCreator extends (...args: any[]) => any> = TActionCreator extends (...args: infer TParams) => (...args: any[]) => infer TReturn ? (...args: TParams) => TReturn : TActionCreator;
export declare type HandleThunkActionCreator<TActionCreator> = TActionCreator extends (...args: any[]) => any ? InferThunkActionCreatorType<TActionCreator> : TActionCreator;
export declare type ResolveThunks<TDispatchProps> = TDispatchProps extends {
    [key: string]: any;
} ? {
    [C in keyof TDispatchProps]: HandleThunkActionCreator<TDispatchProps[C]>;
} : TDispatchProps;
export declare type ResolveArrayThunks<TDispatchProps extends ReadonlyArray<any>> = TDispatchProps extends [
    infer A1,
    infer A2,
    infer A3,
    infer A4,
    infer A5,
    infer A6,
    infer A7,
    infer A8,
    infer A9
] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>,
    HandleThunkActionCreator<A4>,
    HandleThunkActionCreator<A5>,
    HandleThunkActionCreator<A6>,
    HandleThunkActionCreator<A7>,
    HandleThunkActionCreator<A8>,
    HandleThunkActionCreator<A9>
] : TDispatchProps extends [
    infer A1,
    infer A2,
    infer A3,
    infer A4,
    infer A5,
    infer A6,
    infer A7,
    infer A8
] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>,
    HandleThunkActionCreator<A4>,
    HandleThunkActionCreator<A5>,
    HandleThunkActionCreator<A6>,
    HandleThunkActionCreator<A7>,
    HandleThunkActionCreator<A8>
] : TDispatchProps extends [
    infer A1,
    infer A2,
    infer A3,
    infer A4,
    infer A5,
    infer A6,
    infer A7
] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>,
    HandleThunkActionCreator<A4>,
    HandleThunkActionCreator<A5>,
    HandleThunkActionCreator<A6>,
    HandleThunkActionCreator<A7>
] : TDispatchProps extends [
    infer A1,
    infer A2,
    infer A3,
    infer A4,
    infer A5,
    infer A6
] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>,
    HandleThunkActionCreator<A4>,
    HandleThunkActionCreator<A5>,
    HandleThunkActionCreator<A6>
] : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4, infer A5] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>,
    HandleThunkActionCreator<A4>,
    HandleThunkActionCreator<A5>
] : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>,
    HandleThunkActionCreator<A4>
] : TDispatchProps extends [infer A1, infer A2, infer A3] ? [
    HandleThunkActionCreator<A1>,
    HandleThunkActionCreator<A2>,
    HandleThunkActionCreator<A3>
] : TDispatchProps extends [infer A1, infer A2] ? [HandleThunkActionCreator<A1>, HandleThunkActionCreator<A2>] : TDispatchProps extends [infer A1] ? [HandleThunkActionCreator<A1>] : TDispatchProps extends Array<infer A> ? Array<HandleThunkActionCreator<A>> : TDispatchProps extends ReadonlyArray<infer A> ? ReadonlyArray<HandleThunkActionCreator<A>> : never;
/**
 * This interface allows you to easily create a hook that is properly typed for your
 * store's root state.
 *
 * @example
 *
 * interface RootState {
 *   property: string;
 * }
 *
 * const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
 */
export interface TypedUseSelectorHook<TState> {
    <TSelected>(selector: (state: TState) => TSelected, equalityFn?: EqualityFn<TSelected>): TSelected;
}
