// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
//import { Accordion } from 'react-bootstrap-accordion'

// Import components
import { RidersList } from './riders-list'

// Import styles
import './../styles/pages.css'

export const Riders = () => {
  // Prepare states
  const [firstname, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [grading, setGrading] = useState('')
  const [age, setAge] = useState('')
  //const [rating, setRating] = useState('')
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all riders on initial render
  useEffect(() => {
    fetchRiders()
  }, [])

  // Fetch all riders
  const fetchRiders = async () => {
    // Send GET request to 'riders/all' endpoint
    axios
      .get('http://localhost:4001/riders/all')
      .then(response => {
        // Update the riders state
        setRiders(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the rider list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setFirstname('')
    setSurname('')
    setGrading('')
    setAge('')
  }

  // Create new rider
  const handleRiderCreate = () => {
    // Send POST request to 'riders/create' endpoint
    axios
      .post('http://localhost:4001/riders/create', {
        firstname: firstname,
        surname: surname,
        grading: grading,
        age: age
      })
      .then(res => {
        console.log(res.data)

        // Fetch all riders to refresh
        // the riders on the riders list
        fetchRiders()
      })
      .catch(error => console.error(`There was an error creating the ${surname} rider: ${error}`))
  }

  // Submit new rider
  const handleRiderSubmit = () => {
    // Check if all fields are filled
    if (firstname.length > 0 && surname.length > 0 && grading.length > 0 && age.length > 0) {
      // Create new rider
      handleRiderCreate()

      console.info(`Rider ${surname} by ${firstname} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove rider
  const handleRiderRemove = (rider_id: number) => {
    // Send PUT request to 'riders/delete' endpoint
    axios
      .put('http://localhost:4001/riders/delete', { id: rider_id })
      .then(() => {
        console.log(`Rider ${surname} removed.`)

        // Fetch all riders to refresh
        // the riders on the riders list
        fetchRiders()
      })
      .catch(error => console.error(`There was an error removing the ${surname} rider: ${error}`))
  }
/*
  // Reset rider list (remove all riders)
  const handleListReset = () => {
    // Send PUT request to 'riders/reset' endpoint
    axios.put('http://localhost:4001/riders/reset')
    .then(() => {
      // Fetch all riders to refresh
      // the riders on the riders list
      fetchRiders()
    })
    .catch(error => console.error(`There was an error resetting the rider list: ${error}`))
  } */

  return (
    <div className="list-wrapper">
      {/* Form for creating new rider */}
      <p className='header-xl'>Riders</p>

      {/* Render riders list component */}
      <RidersList riders={riders} loading={loading} handleRiderRemove={handleRiderRemove} />

      
        <div className="list-form">
          <div className="form-wrapper" onSubmit={handleRiderSubmit}>
            <div className="form-row">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="surname">Surname:</label>
                        <input className="form-input" size={15} type="text" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="firstname">First name:</label>
                        <input className="form-input" size={15} type="text" id="firstname" name="firstname" value={firstname} onChange={(e) => setFirstname(e.currentTarget.value)} />
                      </fieldset>
                  </td>
                  <td>
                      <fieldset>
                        <label className="form-label" htmlFor="grading">Grading:</label>
                        <input className="form-input" size={1} type="text" id="grading" name="grading" value={grading} onChange={(e) => setGrading(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                    <td>
                      <fieldset>
                        <label className="form-label" htmlFor="age">Age:</label>
                        <input className="form-input" size={2} type="text" id="age" name="age" value={age} onChange={(e) => setAge(e.currentTarget.value)} />
                      </fieldset>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
        <button onClick={handleRiderSubmit} className="btn btn-add">Save rider</button>
      </div>

      
      
      {/* Show reset button if list contains at least one rider */}
      {/*riders.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset riders list.</button>
      )*/}
    </div>
  )
}
