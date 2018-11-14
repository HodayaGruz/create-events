import React, { Component } from 'react';
import styled from 'styled-components';
import FlowChart from './FlowChart';
import Lists from './Lists';
import TitleRow from './TitleRow'

const Root = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({theme}) => theme.colors.backgroundGray}
  padding: 10px;
`;

const LeftWrapper = styled.div`
  width: 100%
`;

class App extends Component {

  constructor(props) {
    super(props)

    this.setSelectedRow = this.setSelectedRow.bind(this);
  }

  setSelectedRow(e, id, type) {
    console.log('drag start', id)
    e.dataTransfer.setData("data", JSON.stringify({id, type}))
  }

  render() {
    return (
      <Root>
        <Lists
          setSelectedRow={this.setSelectedRow}
        />
        <LeftWrapper>
          <TitleRow />
          <FlowChart />
        </LeftWrapper>
      </Root>
    );
  }
}

export default App;
