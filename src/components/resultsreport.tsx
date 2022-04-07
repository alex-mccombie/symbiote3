import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../styles/pages.css';

import { ResultsReportList } from './resultsreport-list'


// Create report page
export const ResultsReport = () => {
    // Prepare states
    const [race_id, setRaceId] = useState(0)
    const [rider_id, setRiderId] = useState(0)
    const [race_position, set_race_position] = useState(0)
    const [race_results, setRaceResults] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch all results on initial render
    useEffect(() => {
        //fetchRaceResults();
        fetchRaceResultsData();
    }, [])

    // Fetch all raceresults
    const fetchRaceResults = async () => {
        // Send GET request to 'raceresults/all' endpoint
        axios
            .get('http://localhost:4001/race_results/all')
            .then(response => {
                //console.log('Loaded race_results',response.data);
                // Update the raceresults state
                setRaceResults(response.data);

                // Update loading state
                setLoading(false);
            })
            .catch(error => console.error(`There was an error retrieving the rider list: ${error}`))
    };


    const fetchRaceResultsData = async () => {
        axios
            .get('http://localhost:4001/race_results/results_report')
            .then(response => {
                //console.log('Loaded race_results',response.data);
                // Update the raceresults state
                console.log('results_report:', response.data);
                setRaceResults(response.data);
                // Update loading state
                setLoading(false);
            })
            .catch(error => console.error(`There was an error retrieving the rider list: ${error}`))
    };



    // Reset all input fields
    const handleInputsReset = () => {
        setRaceId(0);
        setRiderId(0);
        set_race_position(0);
    }

    // Create new rider
    const handleRiderCreate = () => {
        // Send POST request to 'raceresults/create' endpoint
        axios
            .post('http://localhost:4001/race_results/create', {
                race_id: race_id,
                rider_id: rider_id,
                race_position: race_position
            })
            .then(res => {
                console.log('handleRiderCreate',res.data)
                fetchRaceResults()
            })
            .catch(error => console.error(`There was an error creating the ${rider_id} rider: ${error}`))
    }

    // Submit new race_result
    const handleRaceResultSubmit = () => {
        // Check if all fields are filled
        if (race_id > 0 && rider_id > 0 && race_position > 0) {
            // Create new rider
            handleRiderCreate()

            console.info(`Rider ${rider_id} by ${race_id} added.`)

            // Reset all input fields
            handleInputsReset()
        }
    }

    // Remove rider
    const handleRaceResultRemove = (race_position: number) => {
        // Send PUT request to 'raceresults/delete' endpoint
        axios
            .put('http://localhost:4001/race_results/delete', { race_position: race_position })
            .then(() => {
                console.log(`Rider ${rider_id} removed.`)

                // Fetch all raceresults to refresh
                // the raceresults on the raceresults list
                fetchRaceResults()
            })
            .catch(error => console.error(`There was an error removing the ${rider_id} rider: ${error}`))
    }


    return (
        <div className="list-wrapper">
            <p className='header-xl'>Reports</p>
            <ResultsReportList race_results={race_results} loading={loading} handleRaceResultRemove={handleRaceResultRemove} />
           

            <div className="list-form">
                <div className="form-wrapper" onSubmit={handleRaceResultSubmit}>
                    <div className="form-row">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <fieldset>
                                            <label className="form-label" htmlFor="surname">Race</label>
                                            <input className="form-input" size={15} type="text" id="race_id" name="race_id" value={race_id} onChange={(e) => setRaceId(e.currentTarget.value)} />
                                        </fieldset>
                                    </td>
                                    <td>
                                        <fieldset>
                                            <label className="form-label" htmlFor="rider_id">Rider</label>
                                            <input className="form-input" size={15} type="text" id="rider_id" name="rider_id" value={rider_id} onChange={(e) => setRiderId(e.currentTarget.value)} />
                                        </fieldset>
                                    </td>
                                    <td>
                                        <fieldset>
                                            <label className="form-label" htmlFor="race_position">Place</label>
                                            <input className="form-input" size={1} type="text" id="race_position" name="race_position" value={race_position} onChange={(e) => set_race_position(parseInt(e.currentTarget.value))} />
                                        </fieldset>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            <button onClick={handleRaceResultSubmit} className="btn btn-add">Save result</button>


        </div>

    )
}
