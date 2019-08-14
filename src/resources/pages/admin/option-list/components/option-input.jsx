import React from 'react'

const OptionInput = ({ option, onChange }) => (
  <input type="text"
    defaultValue={option.name}
    onChange={(e) => onChange(e.target.value)} />
)

export default OptionInput
