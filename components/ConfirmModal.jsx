import React from 'react'

export default function ConfirmModal() {
  return (
    <div className="modal fade" id="banConfirmationModal" tabIndex="-1" aria-labelledby="banConfirmationModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-0">
        <div className="modal-header border-0">
            <h5 className="modal-title" id="banConfirmationModalLabel">Ban User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            Are you sure you want to ban this user?
        </div>
        <div className="modal-footer border-0 d-flex justify-content-right">
            <button type="button" className="btn btn-secondary rounded-0" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger rounded-0">Ban User</button>
        </div>
        </div>
    </div>
    </div>
   

  )
}
