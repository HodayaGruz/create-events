export const addHistory = (data, type) => ({
    type: 'ADD_HISTORY',
    payload: {data, type},
})

export const removeHistory = () => ({
    type: 'REMOVE_HISTORY'
})

export const clearHistory = () => ({
    type: 'CLEAR_HISTORY'
})

export const undoEvent = (data, type) => ({
    type: 'SET_EVENT',
    payload: {data, type},
})

export const setEvent = (data, type) => ({
    type: 'UPDATE_EVENT',
    payload: {data, type},
})

export const deleteEvent = () => ({
    type: 'CLEAR_EVENT',
})

export const createEvent = (data) => ({
    type: 'CREATE_EVENT',
    payload: data
})

export const clearEvent = () => (dispatch) => {
    dispatch(deleteEvent())
    dispatch(clearHistory());
}

export const saveEvent = () => async (dispatch, getState) => {
    const state = getState().selectedEvent
    const res = await fetch('', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(state)
    })

    console.log('saveData', res)
    dispatch(createEvent(state.event))
    dispatch(clearEvent());
}

export const updateEvent = (data, type) => (dispatch, getState) => {
    dispatch(setEvent(data, type))
    dispatch(addHistory(data, type));
}

export const undo = () => (dispatch, getState) => {
    const {history, selectedEvent} = getState();
    const lastAction = history[history.length - 1];
    if (!lastAction){
        return;
    }
    if (lastAction.type === 'event'){
        dispatch(setEvent('', lastAction.type))
    } else {
        dispatch(undoEvent(
            selectedEvent[lastAction.type].filter(data => lastAction.data !== data), 
            lastAction.type
        ))
    }
    dispatch(removeHistory());
}
