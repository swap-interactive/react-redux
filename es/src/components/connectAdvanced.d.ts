import React from 'react';
import type { Store } from 'redux';
import type { SelectorFactory } from '../connect/selectorFactory';
import type { AdvancedComponentDecorator } from '../types';
import { ReactReduxContext, ReactReduxContextInstance } from './Context';
export interface ConnectProps {
    reactReduxForwardedRef?: React.ForwardedRef<unknown>;
    context?: ReactReduxContextInstance;
    store?: Store;
}
export interface ConnectAdvancedOptions {
    getDisplayName?: (name: string) => string;
    methodName?: string;
    shouldHandleStateChanges?: boolean;
    forwardRef?: boolean;
    context?: typeof ReactReduxContext;
    pure?: boolean;
}
declare function connectAdvanced<S, TProps, TOwnProps, TFactoryOptions = {}>(selectorFactory: SelectorFactory<S, TProps, unknown, unknown>, { getDisplayName, methodName, shouldHandleStateChanges, forwardRef, context, ...connectOptions }?: ConnectAdvancedOptions & Partial<TFactoryOptions>): AdvancedComponentDecorator<TProps, TOwnProps & ConnectProps>;
export default connectAdvanced;
