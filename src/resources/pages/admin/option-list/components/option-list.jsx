import React from 'react'
import request from 'superagent'
import styled from 'styled-components'


import OptionInput from './option-input'

const List = styled.ul`
  list-style: none;
`

class OptionList extends React.Component {
  constructor(...args) {
    super(...args)

    this._backgroundSave = {}

    this.state = {
      options: this.props.options.reduce(
        (state, option) => ({
          ...state,
          [option._id]: option
        }),
        {}
      )
    }

    this.saveOption = this.saveOption.bind(this)
  }

  render() {
    const { options } = this.state

    return (
      <List>
        {Object.entries(options).map(
          ([ id, option ]) => (
            <li key={id}>
              <OptionInput
                option={option}
                onChange={(name) => this.updateOption(id, name)}
              />
            </li>
          )
        )}
      </List>
    )
  }

  updateOption(id, name) {
    this.setState({
      options: {
        ...this.state.options,
        [id]: {
          // ...this.state.options[id],
          name: name
        }
      }
    }, () => this.triggerAutoSave(id))
  }

  triggerAutoSave(id) {
    clearTimeout(this._backgroundSave[id])

    this._backgroundSave[id] = setTimeout(() => {
      this.saveOption(id)
    }, 1e3)
  }

  async saveOption(id) {
    const { body: option } = await request.put(`/admin/options/${id}`)
      .send(this.state.options[id])

    this.setState({
      options: {
        ...this.state.options,
        [option._id]: option
      }
    })
  }
}

export default OptionList
