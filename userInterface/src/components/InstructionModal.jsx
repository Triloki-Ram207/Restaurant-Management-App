import React from 'react';
import '../cssFiles/instructionModal.css';

const InstructionModal = ({ setShowModal, instructions, setInstructions }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
        <h3>Add Cooking Instructions</h3>
        <textarea
          className="modal-textarea"
          placeholder="Type your instructions here..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <p className="modal-note">
          The restaurant will try its best to follow your request. However, refunds or cancellations in this regard won’t be possible.
        </p>
        <div className="modal-actions">
          <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
          <button onClick={() => setShowModal(false)} className="next-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;
