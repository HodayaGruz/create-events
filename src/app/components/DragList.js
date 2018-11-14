import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    color: ${({theme}) => theme.colors.blue};
`;

const Row = styled.div`
    cursor: pointer;
    margin: 10px 0px;
    padding: 10px;
    background-color: ${({theme}) => theme.colors.white};
    color: ${({theme}) => theme.colors.gray};
    border: 1px solid ${({theme}) => theme.colors.blue};
`

const DragList = ({header, data, setSelectedRow, type}) => data.length > 0 && (
    <Root>
        {header}
        {
            data.map(row => 
                <Row 
                    key={row}                     
                    onDragStart={e => setSelectedRow(e, row, type)}                    
                    draggable                    
                    className="draggable">                    
                        {row}                
                </Row>)
        }
    </Root>
)

export default DragList;

