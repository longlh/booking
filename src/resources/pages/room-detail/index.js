window.$ = window.jQuery = require('jquery')
import { Stuck } from 'stuck-js'

const instances = new Stuck([
  { selector: '.js-sticky' },
], { marginTop: 10 })
