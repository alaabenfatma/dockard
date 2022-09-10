import { React, useState, useEffect, useCallback } from 'react';
import ReactDOM from "react-dom";

import { SplitPane } from "react-collapse-pane";

import Editor from "@monaco-editor/react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, isNode, MiniMap, Controls } from 'react-flow-renderer';
import yaml from 'js-yaml';
import { FlowCreator } from '../controllers/flowCreator';
import { type } from '@testing-library/user-event/dist/type';
export default function Main() {
    const [code, setCode] = useState("# Input your docker-compose file here");
    const [flowCreatorInstance, setFlowCreatorInstance] = useState(null);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    useEffect(() => {


        // Load only valid yaml files
        let jsonCode = yaml.load(code);
        if (jsonCode && jsonCode !== null && jsonCode !== undefined
            && typeof jsonCode !== 'string') {
            let flowCreator = new FlowCreator(jsonCode);
            setFlowCreatorInstance(flowCreator);
        }
    }, [code]);
    useEffect(() => {
        if (flowCreatorInstance) { 
            let data = flowCreatorInstance.createFlow();
            setNodes(data.nodes);
            setEdges(data.edges);
            console.log(data.edges)
        }
    }, [flowCreatorInstance]);



    return (
        <SplitPane split="vertical" collapse={true} style={{
            width: "100%",
            height: "100%",
        }}>
            <div >
                <Editor
                    height="90vh"
                    defaultLanguage="yaml"
                    defaultValue={code}
                    theme='vs'
                    onChange={(value, event) => {
                        setCode(value);
                    }}
                />
            </div>
            <div style={{ width: '100%', height: '600px' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    attributionPosition="bottom-left"
                    style={{ width: '600px', height: '600px' }}
                    nodesDraggable={true}
                >
                    <MiniMap
                        nodeStrokeColor={(n) => {
                            if (isNode(n)) return '#0041d0';
                            return '#FFCC00';
                        }}
                        nodeColor={(n) => {
                            if (isNode(n)) return '#0041d0';
                            return '#FFCC00';
                        }}
                        nodeBorderRadius={2}
                    />
                    <Controls />
                </ReactFlow>

            </div>
        </SplitPane>
    )
}
