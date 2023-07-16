'use client';
import React from 'react';
import {
  QueryClient,
  QueryClientProvider as TanstackQueryProvider
} from 'react-query';

interface QueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children
}) => {
  return (
    <TanstackQueryProvider client={queryClient}>
      {children}
    </TanstackQueryProvider>
  );
};

export default QueryClientProvider;
