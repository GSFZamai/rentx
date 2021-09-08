import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';

interface AppHooksProviderProps {
    children: ReactNode;
}

export function AppHooksProvider({children}: AppHooksProviderProps) {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}