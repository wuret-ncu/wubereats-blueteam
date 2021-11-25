import React from 'react';
import { createContext } from 'react';
import useReducerWithThunk from 'use-reducer-thunk';
import { SET_VISIBLE,
         SET_TOTAL_PRICE,
         SET_CHECKING_VISIBLE,
         GET_CARTS_DATA
    } from '../utils/constants';

export const StoreContext = createContext();

const initialState = {
    visible: false,
    total: 0,
    checkingVisible: false,
    cartsData: null
}

function reducer(state, action) {
    switch (action.type) {
        case SET_VISIBLE:
            return{
                ...state,
                visible: action.payload
            }
        case SET_TOTAL_PRICE:
            return{
                ...state,
                total: action.payload
            }
        case SET_CHECKING_VISIBLE:
            return{
                ...state,
                checkingVisible: action.payload
            }
        case GET_CARTS_DATA:
            return{
                ...state,
                cartsData: action.payload
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