import React from 'react'
import RemoveIcon from '@material-ui/icons/Clear';

interface RaceResultsListUI {
  position: number;
  race_results: {
    race_id: number;
    rider_id: number;
    race_title: string;
    firstname: string;
    surname: string;
    race_position:number;
  };
  handleRaceResultRemove: (race_position: number) => void;
}

// Create ResultsReportRow component
export const ResultsReportListRow = (props: RaceResultsListUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.race_results.race_position}
    </td>

    {/*    <td className="table-item">
      race:{props.race_results.race_id}
      |
      rider:{props.race_results.rider_id}
    </td> */}

    <td className="table-item">
      {props.race_results.firstname}
      {' '}
      {props.race_results.surname}
    </td>

    <td className="table-item">
      {props.race_results.race_title}
    </td>


    <td className="table-cell">
      <button
        className="btn btn-remove"
        onClick={() => props.handleRaceResultRemove(props.race_results.race_id)}>
        <RemoveIcon className="icon-size"/>
      </button>
    </td>
  </tr>
)
