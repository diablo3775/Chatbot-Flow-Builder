import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import CustomNode from './components/CustomNode'; 

import 'reactflow/dist/style.css';
import './App.css';

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  { id: '1', position: { x: 50, y: 100 }, data: { label: 'test message 1' }, type: 'customNode', sourcePosition: 'right', targetPosition: 'left' },
  { id: '2', position: { x: 500, y: 30 }, data: { label: 'test message 2' }, type: 'customNode', sourcePosition: 'right', targetPosition: 'left' },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Adding a new node
  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `test message ${nodes.length + 1}` },
      position: { x: 400, y: 0 }, 
      type: 'customNode',
      sourcePosition: 'right',
      targetPosition: 'left'
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Updating existing node
  const updateNode = (id, label) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { label } } : node
      )
    );
  };

  // Selct a node
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Saving the flow
  const saveFlow = () => {
    const invalidNodes = nodes.filter(
      (node) =>
        edges.filter((edge) => edge.source === node.id).length === 0
    );
    if (invalidNodes.length > 0) {
      setErrorMessage('Cannot save Flow');
    } else {
      setErrorMessage('Flow saved successfully');
    }
  };

  // Closing the settings panel
  const closeSettingsPanel = () => {
    setSelectedNode(null);
  };

  return (
    <div className="app-container">
      <NodesPanel addNode={addNode} />
      <div className="flow-container">
        <div className='error-center'>{errorMessage && <div className="error-message">{errorMessage}</div>}</div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes} 
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <button className="save-button" onClick={saveFlow}>Save Flow</button>
      </div>
      {selectedNode && (
        <SettingsPanel
          selectedNode={selectedNode}
          updateNode={updateNode}
          closePanel={closeSettingsPanel}
        />
      )}
    </div>
  );
}
