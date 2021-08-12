import React from 'react';
import { Action, AnyAction, Store } from 'redux';
import type { FixTypeLater } from '../types';
import type { Subscription } from '../utils/Subscription';
export interface ReactReduxContextValue<SS = FixTypeLater, A extends Action = AnyAction> {
    store: Store<SS, A>;
    subscription: Subscription;
}
export declare const ReactReduxContext: React.Context<ReactReduxContextValue<any, AnyAction> | null>;
export declare type ReactReduxContextInstance = typeof ReactReduxContext;
export default ReactReduxContext;
