import React from 'react'

export default function ConfirmModal() {
  return (
    <div className="modal fade" id="banConfirmationModal" tabIndex="-1" aria-labelledby="banConfirmationModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="banConfirmationModalLabel">Ban User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            Are you sure you want to ban this user?
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger">Ban User</button>
        </div>
        </div>
    </div>
    </div>
   

  )
}
