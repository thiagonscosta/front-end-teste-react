import React from 'react';
import context from './context';
import useStorage from './../utils/useStorage';

const StoreProvider = ({ children }) => {
    const [ user, setUser ] = useStorage('user');
    return (
        <context.Provider value={{user, setUser}}>
            {children}
        </context.Provider>
    )
}

export default StoreProvider;