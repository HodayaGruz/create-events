const initialState = {
    event: '',
    suppliers: [],
    entities: []
}

export const selectedEvent = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_EVENT':
            const {type, data} = action.payload;
            return {
                ...state, 
                [type]: type === 'event' ? data : [...state[type], data],
            };
        case 'SET_EVENT':
            return {
                ...state, 
                [action.payload.type]: action.payload.data,
            };
        case 'CLEAR_EVENT':
            return initialState
        default:
            return state;
    }
} 

export const savedEvents = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            return [
                ...state, 
                action.payload,
            ];
        default:
            return state;
    }
}

export const history = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return [
                ...state, 
                action.payload,
            ];
        case 'REMOVE_HISTORY':
            state.pop()
            return [
                ...state
            ]
        case 'CLEAR_HISTORY':
            return []
        default:
            return state;
    }
}