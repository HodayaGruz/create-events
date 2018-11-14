import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as SRD from "storm-react-diagrams"
import * as actions from '../../store/actions';

require("storm-react-diagrams/dist/style.min.css");

const Drop = styled.div`
  width: 100%;
  height: 90%;
  background-color: ${({theme}) => theme.colors.gray};
  position: relative;
`;

const Diagram = styled(SRD.DiagramWidget).attrs({
	allowLooseLinks: false,
	allowCanvasTranslation: false,
	allowCanvasZoom: false
})`
    &.srd-diagram {
        position: static;
        cursor: pointer;
    }

    .srd-node-layer {
        overflow: hidden;
    }
`;

const onDrop = (e, updateEvent, data) => {
    const {id, type} = JSON.parse(e.dataTransfer.getData('data'))

    if (type === 'event'){
        updateEvent(id, type)
        return;
    } 
    console.log('drag end', id, type, data.event)
    if (data.event) {
        updateEvent([...data[type], id], type)
    } else {
        alert('Please select event first.')
    }
}

const FlowChart = ({data, updateEvent}) => {
    const {event, entities, suppliers} = data;
    const engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    if (event !== ''){
        const model = new SRD.DiagramModel();

        // create a default node
        const eventNode = new SRD.DefaultNodeModel(event, "rgb(0,192,255)");
        let startPort = eventNode.addInPort("start");
        let finishPort = eventNode.addOutPort("finish");
        eventNode.setPosition(300, 50);

        const links = [];

        const suppliersNodes = suppliers.map((supplier, index) => {
            const supplierNode = new SRD.DefaultNodeModel(supplier, "rgb(192,0,255)");
            supplierNode.setPosition(200, 150 + index * 50);
            links.push(startPort.link(supplierNode.addOutPort('connected')))
            return supplierNode;
        })

        const entitiesNodes = entities.map((entity, index) => {
            const entityNode = new SRD.DefaultNodeModel(entity, "rgb(192,255,0)");
            entityNode.setPosition(400, 150 + index * 50);
            links.push(finishPort.link(entityNode.addInPort('connected')))
            return entityNode;
        })

        model.addAll(eventNode, ...entitiesNodes, ...suppliersNodes, ...links);
        engine.setDiagramModel(model);
    }

    return (
        <Drop 
            onDrop={e => onDrop(e, updateEvent, data)}
            onDragOver={e => e.preventDefault()}
        >
            <Diagram diagramEngine={engine} />
        </Drop>
    )
}

const enhance = connect((state) => ({data: state.selectedEvent}), ({updateEvent: actions.updateEvent}))
export default enhance(FlowChart);