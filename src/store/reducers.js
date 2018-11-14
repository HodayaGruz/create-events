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
                [type]: data,
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