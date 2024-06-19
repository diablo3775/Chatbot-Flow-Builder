import React from 'react';

const NodesPanel = ({ addNode }) => {
  return (
    <div className="nodes-panel">
      <h3>Nodes Panel</h3>
      <button onClick={addNode}>Add Text Node</button>
    </div>
  );
};

export default NodesPanel;

