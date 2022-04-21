import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'

import {BrowserRouter} from 'react-router-dom'

ReactDom.render(
<BrowserRouter>
    <App /> 
</BrowserRouter>, 
document.getElementById('root'))