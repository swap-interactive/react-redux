import { Context, ReactNode } from 'react';
import { ReactReduxContextValue } from './Context';
import type { FixTypeLater } from '../types';
import { Action, AnyAction, Store } from 'redux';
export interface ProviderProps<A extends Action = AnyAction> {
    /**
     * The single Redux store in your application.
     */
    store: Store<FixTypeLater, A>;
    /**
     * Optional context to be used internally in react-redux. Use React.createContext() to create a context to be used.
     * If this is used, generate own connect HOC by using connectAdvanced, supplying the same context provided to the
     * Provider. Initial value doesn't matter, as it is overwritten with the internal state of Provider.
     */
    context?: Context<ReactReduxContextValue | null>;
    children: ReactNode;
}
declare function Provider({ store, context, children }: ProviderProps): JSX.Element;
export default Provider;
