// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { ClubsList } from './clubs-list'

// Import styles
import './../styles/pages.css'

// Create Clubs component
export const Clubs = () => {
  // Prepare states
  const [club_address, setClubAddress] = useState('')
  const [club_title, setClubTitle] = useState('')
  //const [rating, setRating] = useState('')
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all clubs on initial render
  useEffect(() => {
    fetchClubs()
  }, [])

  // Fetch all clubs
  const fetchClubs = async () => {
    // Send GET request to 'clubs/all' endpoint
    axios
      .get('http://localhost:4001/clubs/all')
      .then(response => {
        // Update the clubs state
        setClubs(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the club list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setClubTitle('')
    setClubAddress('')
  }

  // Create new club
  const handleClubCreate = () => {
    // Send POST request to 'clubs/create' endpoint
    axios
      .post('http://localhost:4001/clubs/create', {
        club_title: club_title,
        club_address: club_address,
      })
      .then(res => {
        console.log(res.data)

        // Fetch all clubs to refresh
        // the clubs on the clubs list
        fetchClubs()
      })
      .catch(error => console.error(`There was an error creating the ${club_title} club: ${error}`))
  }

  // Submit new club
  const handleClubSubmit = () => {
    // Check if all fields are filled
    if (club_address.length > 0 && club_title.length > 0 && club_address.length > 0) {
      // Create new club
      handleClubCreate()

      console.info(`Club ${club_title} by ${club_address} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove club
  const handleClubRemove = (club_id: number) => {
    // Send PUT request to 'clubs/delete' endpoint
    axios
      .put('http://localhost:4001/clubs/delete', { club_id: club_id })
      .then(() => {
        console.log(`Club ${club_title} removed.`)

        // Fetch all clubs to refresh
        // the clubs on the clubs list
        fetchClubs()
      })
      .catch(error => console.error(`There was an error removing the ${club_title} club: ${error}`))
  }
/*
  // Reset club list (remove all clubs)
  const handleListReset = () => {
    // Send PUT request to 'clubs/reset' endpoint
    axios.put('http://localhost:4001/clubs/reset')
    .then(() => {
      // Fetch all clubs to refresh
      // the clubs on the clubs list
      fetchClubs()
    })
    .catch(error => console.error(`There was an error resetting the club list: ${error}`))
  } */

  return (
    <div className="list-wrapper">
      {/* Form for creating new club */}
      <p className='header-xl'>Clubs</p>

      {/* Render clubs list component */}
      <ClubsList clubs={clubs} loading={loading} handleClubRemove={handleClubRemove} />

    
        <div className="list-form">
          <div className="form-wrapper" onSubmit={handleClubSubmit}>
            <div className="form-row">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="club_title">Club Name:</label>
                        <input className="form-input" type="text" id="club_title" name="club_title" value={club_title} onChange={(e) => setClubTitle(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="club_address">Address:</label>
                        <input className="form-input" type="text" id="club_address" name="club_address" value={club_address} onChange={(e) => setClubAddress(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <button onClick={handleClubSubmit} className="btn btn-add">Save club</button>
        </div>

      
      {/* Show reset button if list contains at least one club */}
      {/*clubs.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset clubs list.</button>
      )*/}
    </div>
  )
}
