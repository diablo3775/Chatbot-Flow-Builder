import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const SettingsPanel = ({ selectedNode, updateNode, closePanel }) => {
  const [label, setLabel] = useState(selectedNode.data.label);

  useEffect(() => {
    setLabel(selectedNode.data.label);
  }, [selectedNode]);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    updateNode(selectedNode.id, e.target.value);
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <button className="close-button" onClick={closePanel}>
          <ArrowBackIosIcon />
        </button>
        <div className='settings-panel-text'>Settings Panel</div>
      </div>
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
      />
    </div>
  );
};

export default SettingsPanel;
