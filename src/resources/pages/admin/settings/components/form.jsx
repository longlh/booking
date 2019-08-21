import React, { Fragment } from 'react'
import request from 'superagent'
import arrayMove from 'array-move'

import {
  Button,
  Container,
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'

import Uploader from 'elements/uploader'
import ImageList from 'elements/image-list'

class SettingForm extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      ...this.props.initial,
      slider: [
        ...(this.props.initial.slider || [])
      ]
    }

    this._autoSaves = {}
  }

  syncState(name, e) {
    console.log(e.target.value)

    this.setState({
      [name]: e.target.value
    }, () => this.triggerAutoSave(name))
  }

  triggerAutoSave(name) {
    clearTimeout(this._autoSaves[name])

    this._autoSaves[name] = setTimeout(
      () => this.saveSetting(name),
      2e3
    )
  }

  async saveSetting(name) {
    const { body: setting } = await request
      .post(`/admin/settings/${name}`)
      .send({
        value: this.state[name]
      })

    this.setState({
      [name]: setting.value
    })
  }

  addSlider(image) {
    this.setState({
      slider: [
        ...this.state.slider,
        image
      ]
    }, this.triggerAutoSave('slider'))
  }

  removeSlider(index) {
    this.setState({
      slider: this.state.slider.filter((image, i) => i !== index)
    }, () => this.triggerAutoSave('slider'))
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ slider }) => ({
      slider: arrayMove(slider, oldIndex, newIndex)
    }), () => this.triggerAutoSave('slider'))
  }

  render() {
    return (
      <Form>
        <Grid container stackable columns={2}>
          <Grid.Column>
            <Form.Field>
              <label>Title</label>
              <input type="text"
                value={this.state.title}
                onChange={this.syncState.bind(this, 'title')}
              />
              <p>The name of your site</p>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input type="text"
                value={this.state.description}
                onChange={this.syncState.bind(this, 'description')}
              />
              <p>Used in your theme, meta data and search results</p>
            </Form.Field>
            <Form.Field>
              <label>Contact Email</label>
              <input type="text"
                value={this.state.email}
                onChange={this.syncState.bind(this, 'email')}
              />
            </Form.Field>
            <Form.Field>
              <label>Contact Phone</label>
              <input type="text"
                value={this.state.phone}
                onChange={this.syncState.bind(this, 'phone')}
              />
            </Form.Field>
            <Form.Field>
              <label>Contact Address</label>
              <input type="text"
                value={this.state.address}
                onChange={this.syncState.bind(this, 'address')}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>Introduction Images</label>
              <Uploader
                onFileUploaded={(image) => this.addSlider(image)}
              />
              <p>Used in image slider at your landing page</p>
              <ImageList
                axis='xy'
                pressDelay={200}
                lockToContainerEdges={true}
                transitionDuration={0}
                items={this.state.slider}
                onSortEnd={this.onSortEnd}
                onRemove={this.removeSlider}
              />
            </Form.Field>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

export default SettingForm
