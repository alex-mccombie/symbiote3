import React from 'react'
import RemoveIcon from '@material-ui/icons/Clear';

interface ClubsListRowUI {
  position: number;
  club: {
    club_id: number;
    club_title: string;
    club_address: string;
  }
  handleClubRemove: (club_id: number) => void;
}

// Create ClubsListRow component
export const ClubsListRow = (props: ClubsListRowUI) => (
  <tr className="table-row">
    {/*    <td className="table-cell">
      {props.position}
</td>  */}

    <td className="table-item">
      {props.club.club_title}
    </td>

    <td className="table-item">
      {props.club.club_address}
    </td>

    <td className="table-item" style={{ textAlign: "right" }}>
      <button
        className="btn btn-remove"
        onClick={() => props.handleClubRemove(props.club.club_id)}>
        <RemoveIcon className="icon-size"/>
      </button>
    </td>
  </tr>
)
