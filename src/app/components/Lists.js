import React from 'react'
import {connect} from 'react-redux';
import {difference} from 'lodash';
import styled from 'styled-components';
import DragList from './DragList';
import * as actions from '../../store/actions';

const Root = styled.div`
  width: 15%
  padding-right: 10px;
  margin-top: 4%;
`;

const defaultData = [
    {type: 'event', header: 'Events', data: ['order supply', 'cleaning kitchen', 'close restuarant']},
    {type: 'suppliers', header: 'Suppliers', data: ['food supplier', 'cooker', 'janitor', 'accounting']},
    {type: 'entities', header: 'Entities', data: ['manager', 'chef', 'owner']}
  ]

const Lists = ({setSelectedRow, selectedData, events}) => (
    <Root>
        {
            defaultData.map(({type, header, data}) => {
                return (
                <DragList
                    key={type}
                    {...{type, header, setSelectedRow}}
                    data={difference(data, type === 'event' ? [selectedData[type], ...events] : selectedData[type])} 
                />
            )})
        }
    </Root>
)

const enhance = connect((state) => ({selectedData: state.selectedEvent, events: state.savedEvents}))
export default enhance(Lists);