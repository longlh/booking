import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import { render } from 'react-dom'

import SettingForm from './components/form'

render(
  <SettingForm initial={null} />,
  document.getElementById('setting-form')
)
