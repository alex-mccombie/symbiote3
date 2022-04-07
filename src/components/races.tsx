// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
//import { Accordion } from 'react-bootstrap-accordion'

// Import components
import { RacesList } from './races-list'

// Import styles
import './../styles/pages.css'

// Create Races component
export const Races = () => {
  // Prepare states
  const [race_address, setRaceAddress] = useState('')
  const [race_title, setRaceTitle] = useState('')
  const [race_time, setRaceTime] = useState(0)
  const [race_status, setRaceStatus] = useState('')
  //const [rating, setRating] = useState('')
  const [races, setRaces] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all races on initial render
  useEffect(() => {
    fetchRaces()
  }, [])

  // Fetch all races
  const fetchRaces = async () => {
    // Send GET request to 'races/all' endpoint
    axios
      .get('http://localhost:4001/races/all')
      .then(response => {
        // Update the races state
        setRaces(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the race list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setRaceTitle('')
    setRaceAddress('')
    setRaceTime(0)
    setRaceStatus('')
  }

  // Create new race
  const handleRaceCreate = () => {
    // Send POST request to 'races/create' endpoint
    axios
      .post('http://localhost:4001/races/create', {
        race_title: race_title,
        race_address: race_address,
        race_time: race_time,
        race_status: race_status
      })
      .then(res => {
        console.log(res.data)

        // Fetch all races to refresh
        // the races on the races list
        fetchRaces()
      })
      .catch(error => console.error(`There was an error creating the ${race_title} race: ${error}`))
  }

  // Submit new race
  const handleRaceSubmit = () => {
    // Check if all fields are filled
    if (race_address.length > 0 && race_title.length > 0 && race_time > 0 && race_address.length > 0 && race_status.length > 0) {
      // Create new race
      handleRaceCreate()

      console.info(`Race ${race_title} by ${race_address} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove race
  const handleRaceRemove = (race_id: number) => {
    // Send PUT request to 'races/delete' endpoint
    axios
      .put('http://localhost:4001/races/delete', { race_id: race_id })
      .then(() => {
        console.log(`Race ${race_title} removed.`)

        // Fetch all races to refresh
        // the races on the races list
        fetchRaces()
      })
      .catch(error => console.error(`There was an error removing the ${race_title} race: ${error}`))
  }
/*
  // Reset race list (remove all races)
  const handleListReset = () => {
    // Send PUT request to 'races/reset' endpoint
    axios.put('http://localhost:4001/races/reset')
    .then(() => {
      // Fetch all races to refresh
      // the races on the races list
      fetchRaces()
    })
    .catch(error => console.error(`There was an error resetting the race list: ${error}`))
  } */

  return (
    <div className="list-wrapper">
      {/* Form for creating new race */}
      <p className='header-xl'>Races</p>

      {/* Render races list component */}
      <RacesList races={races} loading={loading} handleRaceRemove={handleRaceRemove} />


        <div className="list-form">
          <div className="form-wrapper" onSubmit={handleRaceSubmit}>
            <div className="form-row">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="race_title">Name:</label>
                        <input className="form-input" size={20} type="text" id="race_title" name="race_title" value={race_title} onChange={(e) => setRaceTitle(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="race_address">Address:</label>
                        <input className="form-input" size={30} type="text" id="race_address" name="race_address" value={race_address} onChange={(e) => setRaceAddress(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="race_time">Time:</label>
                        <input className="form-input" size={10} type="text" id="race_time" name="race_time" value={race_time} onChange={(e) => setRaceTime(Date.parse(e.currentTarget.value))} />
                      </fieldset>
                    </td>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="race_status">Status:</label>
                        <input className="form-input" size={4} type="text" id="race_status" name="race_status" value={race_status} onChange={(e) => setRaceStatus(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </div>

          <button onClick={handleRaceSubmit} className="btn btn-add">Save race</button>
        </div>


      {/* Show reset button if list contains at least one race */}
      {/*races.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset races list.</button>
      )*/}
    </div>
  )
}
