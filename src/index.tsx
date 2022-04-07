// Import deps
import React from 'react'
import { render } from 'react-dom'

// Import components
import { FrontPage } from './components/frontpage'

// Import styles
import './styles/styles.css'
import "bootstrap/dist/css/bootstrap.min.css";

// Find div container
const rootElement = document.getElementById('root')

// Render Riders component in the DOM
render(<FrontPage />, rootElement)
