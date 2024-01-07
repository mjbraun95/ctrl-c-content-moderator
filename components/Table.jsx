import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faXmarkCircle,faPersonWalkingArrowRight,faStopwatch,faTrash } from '@fortawesome/free-solid-svg-icons';

  ;


export default function Table() {
  return (
        <div className="table-responsive">
            <table className="table custom-border border border-2 border-black">
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">Flagged Text</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Ban</th>
                        <th scope="col">Kick</th>
                        <th scope="col">Timeout</th>
                        <th scope="col">Del</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className='py-4' scope="row">Baljeet</td>
                        <td className='py-4'>People suck People suck People suck People suck People suck People suck People suck People suck</td>
                        <td className='py-4'>Hate Speech 98%</td>
                        <td className='py-4' data-bs-toggle="modal" data-bs-target="#banConfirmationModal"><FontAwesomeIcon icon={faXmarkCircle} /></td>
                        <td className='py-4'><FontAwesomeIcon icon={faPersonWalkingArrowRight} /></td>
                        <td className='py-4'><FontAwesomeIcon icon={faStopwatch} /></td>
                        <td className='py-4'><FontAwesomeIcon icon={faTrash} /></td>
                    </tr>
                    {/* Repeat the row for as many entries as you have */}
                </tbody>
            </table>
        </div>

    
  )
}
