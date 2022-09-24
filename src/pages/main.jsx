import { React, useState, useEffect, useCallback } from 'react';
import { SplitPane } from "react-collapse-pane";

import Editor from "@monaco-editor/react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, isNode, MiniMap, Controls } from 'react-flow-renderer';
import yaml from 'js-yaml';
import { FlowCreator } from '../controllers/flowCreator';

export default function Main() {
    const [code, setCode] = useState("# Input your docker-compose file here");
    const [flowCreatorInstance, setFlowCreatorInstance] = useState(new FlowCreator());

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    let errorNode = () => {
        return flowCreatorInstance.createErrorNode('Error parsing docker-compose file, please check your syntax');
    }
    useEffect(() => {

        let jsonCode;
        // Load only valid yaml files
        try {
            jsonCode = yaml.load(code);
        } catch (error) {
            console.log(error);
            setNodes([
                errorNode()
            ]);
        }

        if (jsonCode && jsonCode !== null && jsonCode !== undefined
            && typeof jsonCode !== 'string') {
            let flowCreator = new FlowCreator(jsonCode);
            setFlowCreatorInstance(flowCreator);
        }
    }, [code]);

    useEffect(() => {
        if (flowCreatorInstance) {
            let data;
            try {
                data = flowCreatorInstance.createFlow();
            }
            catch (error) {
                console.log(error);
            }

            if (data) {
                setNodes(data.nodes);
                setEdges(data.edges);
            }
            else {
                setNodes([
                    errorNode()
                ]);
                setEdges([]);
                console.log("No data");
            }
        }
    }, [flowCreatorInstance]);



    return (
        <SplitPane split="vertical" collapse={true} style={{
            width: "100%",
            height: "100%",
        }}

        >
            <div style={{
                width: "100%",
                height: "100%",
                overflow: "auto",
            }}>
                <Editor
                    height="100vh"
                    width={"100%"}
                    defaultLanguage="yaml"
                    defaultValue={code}
                    theme='vs'
                    onChange={(value, event) => {
                        setCode(value);
                    }}
                />
            </div>
            <div style={{ width: '100%', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView={true}
                    attributionPosition="bottom-left"
                    style={{ width: '100%', height: '100vh' }}
                    nodesDraggable={true}
                    onNodeClick={(event, node) => console.log(node)}
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
