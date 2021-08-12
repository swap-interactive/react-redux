import React, { useMemo } from 'react';
import { ReactReduxContext } from './Context';
import { createSubscription } from '../utils/Subscription';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';

function Provider({
  store,
  context,
  children
}) {
  const contextValue = useMemo(() => {
    const subscription = createSubscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store,
      subscription
    };
  }, [store]);
  const previousState = useMemo(() => store.getState(), [store]);
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
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

export default Provider;