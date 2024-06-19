import React from 'react';
import { Handle, Position } from 'reactflow';
import WhatsappIcon from '../assets/whatsapp.svg'
import MessageIcon from '../assets/message.png'

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div className="custom-node-header">
        <div className='message-center'>
          <img className='message-icon' src={MessageIcon} />
          <div>Send Message</div>
        </div>
        <span className="custom-node-icon"><img className='whatsapp-icon' src={WhatsappIcon} /></span>
      </div>
      <div className="custom-node-body">
        <p>{data.label}</p>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;
