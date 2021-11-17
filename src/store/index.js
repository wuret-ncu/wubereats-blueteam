import React from 'react';
import { createContext } from 'react';
import useReducerWithThunk from 'use-reducer-thunk';
import { SET_VISIBLE
    } from '../utils/constants';

export const StoreContext = createContext();

const initialState = {
    visible: false
}

function reducer(state, action) {
    switch (action.type) {
        case SET_VISIBLE:
            return{
                ...state,
                visible: action.payload
            }
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