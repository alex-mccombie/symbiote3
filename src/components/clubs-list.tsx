// Import deps
import React from 'react'

// Import components
import { ClubsListRow } from './clubs-list-row'

// Import styles
import './../styles/pages-list.css'

// Create interfaces
interface ClubUI {
  club_id: number;
  club_title: string;
  club_address: string;
}

interface ClubsListUI {
  clubs: ClubUI[];
  loading: boolean;
  handleClubRemove: (club_id: number) => void;
}

// Create ClubsList component
export const ClubsList = (props: ClubsListUI) => {
  // Show loading message
  //console.log('ClubsList:', props);
  if (props.loading) return <p>Club table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Club Name</th>
            <th className="table-head-item">Address</th>
            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
        {props.clubs.length > 0 ? (
            props.clubs.map((club: ClubUI, idx) => (
              <ClubsListRow
                key={club.club_id}
                club={club}
                position={idx + 1}
                handleClubRemove={props.handleClubRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no clubs to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
