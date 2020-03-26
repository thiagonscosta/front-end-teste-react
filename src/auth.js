import { useStore } from './store';
import { useCallback } from 'react';

export const useAuth = () => {
    const [ store, setStore ] = useStore();

    const login = useCallback(auth => setStore({ auth }), []);
    const logout = useCallback(() => setStore({ auth: null }));

    return [ store && store.auth, { login, logout } ];
}