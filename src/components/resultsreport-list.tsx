import React from 'react'
import { ResultsReportListRow } from './resultsreport-list-row'

import './../styles/pages-list.css'


interface RaceResultsUI {
  rider_id: number;
  race_id: number;
  firstname: string;
  surname: string;
  race_title: string;
  race_position: number;
}

interface RaceResultsListUI {
  race_results: RaceResultsUI[];
  loading: boolean;
  handleRaceResultRemove: (race_position: number) => void;
}

// Create RaceResultsList component
export const ResultsReportList = (props: RaceResultsListUI) => {
  // Show loading message
  //console.log('RaceResultsList:', props);
  if (props.loading) return <p>RaceResult table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Final Position</th>
            <th className="table-head-item">Rider Name</th>
            <th className="table-head-item">Race Name</th>
            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
        {props.race_results && props.race_results.length > 0 ? (
            props.race_results.map((race_result: RaceResultsUI, idx) => (
              <ResultsReportListRow
                key={idx}
                race_results={race_result}
                position={idx + 1}
                handleRaceResultRemove={props.handleRaceResultRemove}
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
