import React from 'react'

export default function Table() {
  return (
    <div className="table-responsive">
        <table className="table table-primary">
            <thead>
                <tr>
                    <th scope="col">Column 1</th>
                    <th scope="col">Column 2</th>
                    <th scope="col">Column 3</th>
                    <th scope="col">Column 3</th>
                    <th scope="col">Column 3</th>
                </tr>
            </thead>
            <tbody>
                <tr className="">
                    <td scope="row">R1C1</td>
                    <td>R1C2</td>
                    <td>R1C3</td>
                    <td>R1C3</td>
                    <td>R1C3</td>
                </tr>
                <tr className="">
                    <td scope="row">Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                    <td>Item</td>
                </tr>
            </tbody>
        </table>
    </div>
    
  )
}
