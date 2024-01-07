import Table from '@/components/Table'
import React from 'react'
import ConfirmModal from '@/components/ConfirmModal'

export default function dashboard() {
  return (
    <div className="container">
      <h1 className='my-5'>Welcome <span className='text-primary'>$Name</span></h1>
      <Table></Table>
      <ConfirmModal></ConfirmModal>

    </div>
  )
}
