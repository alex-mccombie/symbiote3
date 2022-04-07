// Import deps
import React, { useState } from 'react'
import { Riders } from './riders'
import { Races } from './races'
import { Clubs } from './clubs'
import 'bootstrap/dist/css/bootstrap.css';
import { Button,Collapse } from 'react-bootstrap'
import { ResultsReport } from './resultsreport'
import './../styles/pages.css'

// Create front page
export const FrontPage = () => {
    // Prepare states
    const [ClubsOpen, setClubsOpen] = useState(false)
    const [RidersOpen, setRidersOpen] = useState(false)
    const [RacesOpen, setRacesOpen] = useState(false)
    const [ReportsOpen, setReportsOpen] = useState(false)

    return (
        <div className="list-wrapper">
            <p className="header-xl">Racer Database</p>
            <Button
                onClick={() => setClubsOpen(!ClubsOpen)}
                aria-controls="collapse-this"
                aria-expanded={ClubsOpen}
                variant="secondary"
                size="lg"
            >
                CLUBS
            </Button>
            <Collapse in={ClubsOpen}>
                <div id="collapse-this">
                    <Clubs />
                </div>
            </Collapse>

            <hr />

            <Button
                onClick={() => setRacesOpen(!RacesOpen)}
                aria-controls="collapse-this"
                aria-expanded={RacesOpen}
                variant="secondary"
                size="lg"
            >
                RACES
            </Button>
            <Collapse in={RacesOpen}>
                <div id="collapse-this">
                    <Races />
                </div>
            </Collapse>

            <hr />

            <Button
                onClick={() => setRidersOpen(!RidersOpen)}
                aria-controls="collapse-this"
                aria-expanded={RidersOpen}
                variant="secondary"
                size="lg"
            >
                RIDERS
            </Button>
            <Collapse in={RidersOpen}>
                <div id="collapse-this">
                    <Riders />
                </div>
            </Collapse>

            <hr />
            
            <Button
                onClick={() => setReportsOpen(!ReportsOpen)}
                aria-controls="collapse-this"
                aria-expanded={ReportsOpen}
                variant="secondary"
                size="lg"
            >
                REPORTS
            </Button>
            <Collapse in={ReportsOpen}>
                <div id="collapse-this">
                    <ResultsReport />
                </div>
            </Collapse>
    







            {/* Render riders list component */}
            {/* Show reset button if list contains at least one rider */}
            {/*riders.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset riders list.</button>
      )*/}
        </div>
    )
}
