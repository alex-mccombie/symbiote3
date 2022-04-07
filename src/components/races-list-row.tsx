import React from 'react'
import RemoveIcon from '@material-ui/icons/Clear';

interface RacesListRowUI {
  position: number;
  race: {
    race_id: number;
    race_title: string;
    race_time: string;
    race_address: string;
    race_status: string;
  }
  handleRaceRemove: (race_id: number) => void;
}

// Create RacesListRow component
export const RacesListRow = (props: RacesListRowUI) => (
  <tr className="table-row">
    {/*    <td className="table-item">
      {props.position}
</td> */}

    <td className="table-item">
      {props.race.race_title}
    </td>

    <td className="table-item">
      {props.race.race_address}
    </td>

    <td className="table-item">
      {props.race.race_time}
    </td>

    <td className="table-item">
      {props.race.race_status}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleRaceRemove(props.race.race_id)}>
        <RemoveIcon className='icon-size'/>
      </button>
    </td>
  </tr>
)
