import React from 'react'
import { render } from 'react-dom'

import OptionList from './components/option-list'

render(<OptionList options={OPTIONS} />, document.getElementById('option-list'))
