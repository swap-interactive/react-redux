/// <reference types="react" />
/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */
export declare function createStoreHook(context?: import("react").Context<import("../components/Context").ReactReduxContextValue<any, import("redux").AnyAction> | null>): () => import("redux").Store<any, import("redux").AnyAction>;
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
export declare const useStore: () => import("redux").Store<any, import("redux").AnyAction>;
