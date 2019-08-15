import '@fortawesome/fontawesome-free/css/all'
import '@fortawesome/fontawesome-free//js/all'
import 'bulma/bulma.sass'

import React from 'react'
import { render } from 'react-dom'

import Form from './components/form'

const form = document.getElementById('form')

render(<Form asset={ASSET} />, form)
