import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const Button = styled.div`
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    background-color: ${({theme, red, gray}) => theme.colors[red ? 'red' : gray ? 'gray' : 'blue']};
    border-radius: 6px;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;

    :hover {
        opacity: 0.9;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
const Title = styled.span`
    font-weight: bold;
    color: ${({theme}) => theme.colors.blue};
    font-size: 20px;
    flex-grow: 1;
`;

const TitleRow = ({clearEvent, saveEvent, data, undo}) => (
    <TitleWrapper>
        <Title>Event & Results</Title>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={clearEvent}>Clear</Button>
        <Button onClick={data.event ? saveEvent : null}>Submit</Button>
    </TitleWrapper>
);

const enhance = connect(({selectedEvent}) => ({data: selectedEvent}), 
    ({clearEvent: actions.clearEvent, saveEvent: actions.saveEvent, undo: actions.undo}))

export default enhance(TitleRow);