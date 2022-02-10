import userEvent from '@testing-library/user-event';
import React from 'react';
import { createContext, useReducer } from 'react';
import useReducerWithThunk from 'use-reducer-thunk';
import { SET_VISIBLE,
         SET_CHECKING_VISIBLE,
         GET_CARTS_DATA,
         SET_SEARCH_VALUE,
         SET_ENTRY_SEARCH_BTN,
         SET_DELETE_STORE,
         SET_COMMENTS
    } from '../utils/constants';

export const StoreContext = createContext();

let listItems = []
const initialState = {
    visible: false,
    checkingVisible: false,
    cartsData: null,
    search:``,
    entrySearchBtn: null,
    deleteStore: false,
    list: {
        listItems
    }
}

function reducer(state, action) {
    switch (action.type) {
        case SET_VISIBLE:
            return{
                ...state,
                visible: action.payload
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
        case SET_SEARCH_VALUE:
            return{
                ...state,
                search: action.payload
            }
        case SET_ENTRY_SEARCH_BTN:
            return{
                ...state,
                entrySearchBtn: action.payload
            }
        case SET_DELETE_STORE:
            return{
                ...state,
                deleteStore: action.payload
            }
        case SET_COMMENTS:
            const newItem = action.payload;
            const num = listItems.findIndex(lists => (lists.commentTime === newItem.commentTime) && (lists.commentName === newItem.commentName));
            if(num === -1) {
                listItems = [...state.list.listItems, newItem]
                return{
                    ...state,
                    list: {...state.list, listItems}
                }
            } else {
                listItems[num].commentScore = newItem.commentScore
                return{
                    ...state,
                    list:{listItems}
                }
            }
        default: 
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState);
    // const [state, dispatch] = useReducerWithThunk(
    //     reducer,
    //     initialState,
    //     "example"
    // )
    const value = { state, dispatch };
    return(
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}