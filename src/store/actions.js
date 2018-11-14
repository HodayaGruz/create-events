import {pick} from 'lodash';

export const updateEvent = (data, type) => ({
    type: 'UPDATE_EVENT',
    payload: {data, type},
})

export const clearEvent = () => ({
    type: 'CLEAR_EVENT',
})

export const createEvent = (data) => ({
    type: 'CREATE_EVENT',
    payload: data
})

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
