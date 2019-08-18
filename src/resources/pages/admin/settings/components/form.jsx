import React, { Fragment } from 'react'
import request from 'superagent'

import {
  Button,
  Container,
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'

import Uploader from 'elements/uploader'

class SettingForm extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      ...this.props.initial
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

  render() {
    return (
      <Fragment>
        <Container>
          <Button primary floated='right'
            onClick={null}>
            Save
          </Button>
        </Container>
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
                <p>Used for notification</p>
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Introduction Images</label>
                <Uploader
                  onFileUploaded={(image) => null}
                />
                <p>Used in image slider at your landing page</p>
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
      </Fragment>
    )
  }
}

export default SettingForm
