import React from 'react'
import RemoveIcon from '@material-ui/icons/Clear';

interface RidersListRowUI {
  position: number;
  rider: {
    rider_id: number;
    firstname: string;
    surname: string;
    grading: string;
    age: number;
  }
  handleRiderRemove: (rider_id: number) => void;
}

// Create RidersListRow component
export const RidersListRow = (props: RidersListRowUI) => (
  <tr className="table-row">
    {/*    <td className="table-item">
      {props.position}
</td> */}

    <td className="table-item">
      {props.rider.firstname}
      {' '}
      {props.rider.surname}
    </td>

    <td className="table-item">
      {props.rider.grading}
    </td>

    <td className="table-item">
      {props.rider.age}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleRiderRemove(props.rider.rider_id)}>
        <RemoveIcon className="icon-size" />
      </button>
    </td>
  </tr>
)
