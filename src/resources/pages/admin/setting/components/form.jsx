import React, { Fragment } from 'react'

import {
  Button,
  Container,
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'

import Uploader from 'elements/uploader'

class SettingForm extends React.Component {
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
                <input type="text" />
                <p>The name of your site</p>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input type="text" />
                <p>Used in your theme, meta data and search results</p>
              </Form.Field>
              <Form.Field>
                <label>Contact Email</label>
                <input type="text" />
                <p>Used for notification</p>
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Introduction images</label>
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
