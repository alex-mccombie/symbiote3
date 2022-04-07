// Import deps
import React from 'react'

// Import components
import { RacesListRow } from './races-list-row'

// Import styles
import './../styles/pages-list.css'

// Create interfaces
interface RaceUI {
  race_id: number;
  race_title: string;
  race_time: string;
  race_address: string;
  race_status: string;
}

interface RacesListUI {
  races: RaceUI[];
  loading: boolean;
  handleRaceRemove: (race_id: number) => void;
}

// Create RacesList component
export const RacesList = (props: RacesListUI) => {
  // Show loading message
  //console.log('RacesList:', props);
  if (props.loading) return <p>Race table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />
            <th className="table-head-item">Race Name</th>
            <th className="table-head-item">Address</th>
            <th className="table-head-item">Date</th>
            <th className="table-head-item">Status</th>
            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
        {props.races.length > 0 ? (
            props.races.map((race: RaceUI, idx) => (
              <RacesListRow
                key={race.race_id}
                race={race}
                position={idx + 1}
                handleRaceRemove={props.handleRaceRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no races to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
