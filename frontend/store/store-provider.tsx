'use client';

import React from 'react';
import { Provider, ProviderProps } from 'react-redux';
import store from './store';

interface StoreProviderProps {
  children: ProviderProps['children'];
}
const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
