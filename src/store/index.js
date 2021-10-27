import React from 'react';
import { createContext } from 'react';
import useReducerWithThunk from 'use-reducer-thunk';

export const StoreContext = createContext();
const initialState = {
}
function reducer(state, action) {
    switch (action.type) {
 
        default: 
            return state;
    }
}
export function StoreProvider(props) {
    const [state, dispatch] = useReducerWithThunk(
        reducer,
        initialState,
        "example"
    )
    const value = { state, dispatch };
    return(
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}