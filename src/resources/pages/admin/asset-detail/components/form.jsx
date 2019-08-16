import arrayMove from 'array-move'
import React, { Fragment } from 'react'
import request from 'superagent'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'

// import editor
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import UI components
import 'semantic-ui-css/semantic.min.css'
import { Button, Card, Container, Divider, Grid, Header, Form, Icon, Image, List, Menu, Reveal, Segment, TextArea } from 'semantic-ui-react'

import styled from 'styled-components'

import Uploader from './uploader'

const Thumbnail = styled(Image)`
  line-height: 150px;
  overflow: hidden;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  display: inline-block;
  text-align: center;
`

Thumbnail.Content = styled.div`
  margin-left: -999px;
  margin-right: 999px;
`

const SortableImage = SortableElement(({ value, onRemove }) => (
    <Thumbnail image={`/upload/${value}`}>
      <Button negative icon='trash' circular onClick={onRemove} />
    </Thumbnail>
))

const ImageList = SortableContainer(({ items = [], onRemove }) => {
  return (
    <Image.Group size='small'>
      {items.map(
        (image, index) => <SortableImage
          key={`item-${index}`}
          index={index}
          value={image}
          onRemove={() => onRemove(index)}
        />
      )}
    </Image.Group>
  )
})

class AssetForm extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      asset: {
        hash: this.props.asset.hash,
        published: this.props.asset.published,
        name: this.props.asset.name,
        excerpt: this.props.asset.excerpt,
        description: this.props.asset.description,
        price: this.props.asset.price,
        images: [
          ...(this.props.asset.images || [])
        ],
        options: [
          ...(this.props.asset.options || [])
        ]
      }
    }

    this.publishAsset = this.publishAsset.bind(this)
    this.saveAsset = this.saveAsset.bind(this)
    this.updateAssetState = this.updateAssetState.bind(this)
    this.addAssetImage = this.addAssetImage.bind(this)
    this.removeAssetImage = this.removeAssetImage.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ asset }) => ({
      asset: {
        ...asset,
        images: arrayMove(asset.images, oldIndex, newIndex)
      }
    }), () => this.triggerAutoSave())
  }

  triggerAutoSave() {
    clearTimeout(this._backgroundSave)

    this._backgroundSave = setTimeout(() => {
      console.log('auto save asset...')

      this.saveAsset()
    }, 2e3)
  }

  render() {
    const { asset } = this.state

    return (
      <Fragment>
        <Container>
          <Button primary floated='right'
            disabled={asset.published && asset.published.hash === asset.hash}
            onClick={this.publishAsset}>
            Publish
          </Button>
          {asset.published && asset.published.hash && (
            <Button floated='right'>Unpublish</Button>
          )}
          <Button negative floated='right'>Delete</Button>
          <Divider hidden clearing />
        </Container>
        <Grid container stackable columns={2}>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input type="text"
                  value={asset.name}
                  onChange={(e) => this.updateAssetState('name', e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Excerpt</label>
                <TextArea
                  rows={3}
                  value={asset.excerpt}
                  onChange={(e) => this.updateAssetState('excerpt', e.target.value)}
                 />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
              </Form.Field>
              <CKEditor
                editor={ClassicEditor}
                data={asset.description}
                onChange={(e, editor) => this.updateAssetState('description', editor.getData())}
              />
             </Form>
          </Grid.Column>
          <Grid.Column>
            <Uploader
              onFileUploaded={(image) => this.addAssetImage(image)}
            />
            <ImageList
              axis='xy'
              pressDelay={200}
              lockToContainerEdges={true}
              transitionDuration={0}
              items={asset.images}
              onSortEnd={this.onSortEnd}
              onRemove={this.removeAssetImage}
            />
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }

  async publishAsset(e) {
    e.preventDefault()

    const { body: asset } = await request.post(`/admin/assets/${this.props.asset._id}/publish`)

    this.setState({ asset })
  }

  async saveAsset() {
    // send ajax
    const { body: asset } = await request.post(`/admin/assets/${this.props.asset._id}`)
      .send({
        id: this.props.asset._id,
        ...this.state.asset
      })

    this.setState({ asset })
  }

  updateAssetState(field, value) {
    this.setState({
      asset: {
        ...this.state.asset,
        [field]: value
      }
    }, () => this.triggerAutoSave())
  }

  addAssetImage(image) {
    this.setState({
      asset: {
        ...this.state.asset,
        images: [
          ...this.state.asset.images,
          image
        ]
      }
    }, () => this.triggerAutoSave())
  }

  removeAssetImage(index) {
    console.log('xxx', index)

    this.setState({
      asset: {
        ...this.state.asset,
        images: this.state.asset.images.filter((image, i) => i !== index)
      }
    }, () => this.triggerAutoSave())
  }
}

export default AssetForm
