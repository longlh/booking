import arrayMove from 'array-move'
import React, { Fragment } from 'react'
import request from 'superagent'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'

// import editor
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import UI components
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Grid, Header, Form, Image, List, TextArea } from 'semantic-ui-react'

import Uploader from './uploader'

const SortableImage = SortableElement(({ value }) => (
  <Image src={`/upload/${value}`} />
))

const ImageList = SortableContainer(({ items = [] }) => {
  return (
    <Image.Group size='small'>
      {items.map(
        (image, index) => <SortableImage
          key={`item-${index}`}
          index={index}
          value={image}
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
    }, 1e3)
  }

  render() {
    const { asset } = this.state

    return (
      <Fragment>
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
              items={asset.images}
              onSortEnd={this.onSortEnd}
            />
          </Grid.Column>
        </Grid>
        <Container>
          <Header as="h3">{asset.hash}</Header>
          <Button primary
            disabled={asset.published && asset.published.hash === asset.hash}
            onClick={this.publishAsset}>
            Publish
          </Button>
         </Container>
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
}

export default AssetForm
