import { createStore } from 'redux';

const initialState = {
    loading: false,
}

export const loadingAction = {
    type: "LoadUnload"
}

 function reducer(state, action) {
    if (action.type === "LoadUnload") {
        return {
            ...state,
            loading: !state.loading
        };
    }
    return state;
}

export const store = createStore(reducer, initialState);