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
         SET_COMMENTS,
         CLEAN_COMMENTS,
         SET_GROUP_ORDER_MODAL_VISIBLE,
         SET_GROUP_ORDER_CODE,
         SET_DRAWER_SUM
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
    },
    groupOrderModalVisible: false,
    code: 'get a code',
    drawerSum: ''
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
        case CLEAN_COMMENTS:
            listItems = action.payload;
            return{
                ...state,
                list: {listItems}
            }
        case SET_GROUP_ORDER_MODAL_VISIBLE:
            return{
                ...state,
                groupOrderModalVisible: action.payload
            }
        case SET_GROUP_ORDER_CODE:
            return{
                ...state,
                code: action.payload
            }
        case SET_DRAWER_SUM:
            return {
                ...state,
                drawerSum: action.payload
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