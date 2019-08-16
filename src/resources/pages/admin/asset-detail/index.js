import React from 'react'
import { render } from 'react-dom'

import Form from './components/form'

const form = document.getElementById('asset-form')

render(<Form asset={ASSET} />, form)
