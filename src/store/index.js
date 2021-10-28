import React from 'react';
import { createContext } from 'react';
import useReducerWithThunk from 'use-reducer-thunk';

export const StoreContext = createContext();

let foodStores = [
    {id: "fs1", name: "大嗑蔬菜蛋餅", phone: "03-377-7999", restDay: "六、日"},
    {id: "fs2", name: "品樂", phone: "03-237-4449", restDay: "六"},
    {id: "fs3", name: "竹香", phone: "03-222-9999", restDay: "五、六、日"}
]
const initialState = {
    stores:{
        foodStores
    }
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