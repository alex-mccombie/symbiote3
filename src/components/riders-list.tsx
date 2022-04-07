// Import deps
import React from 'react'

// Import components
import { RidersListRow } from './riders-list-row'

// Import styles
import './../styles/pages-list.css'

// Create interfaces
interface RiderUI {
  rider_id: number;
  firstname: string;
  surname: string;
  age: number;
  grading: string;
}

interface RidersListUI {
  riders: RiderUI[];
  loading: boolean;
  handleRiderRemove: (rider_id: number) => void;
}

// Create RidersList component
export const RidersList = (props: RidersListUI) => {
  // Show loading message
  //console.log('RidersList:', props);
  if (props.loading) return <p>Rider table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Name</th>
            <th className="table-head-item">Grading</th>
            <th className="table-head-item">Age</th>
            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
        {props.riders.length > 0 ? (
            props.riders.map((rider: RiderUI, idx) => (
              <RidersListRow
                key={rider.rider_id}
                rider={rider}
                position={idx + 1}
                handleRiderRemove={props.handleRiderRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no riders to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
