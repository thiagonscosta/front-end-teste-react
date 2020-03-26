import { createContext } from 'react';

const StoreContext = createContext({
    user: null,
    setUser: () => {}
});

export default StoreContext;