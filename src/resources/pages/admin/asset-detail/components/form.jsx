import arrayMove from 'array-move'
import React from 'react'
import request from 'superagent'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import styled from 'styled-components'

import Uploader from './uploader'

const EditorWrapper = styled.div`
  border: 1px solid gray;
  padding: 8px;
`

const HorizalList = styled.ul`
  li {
    display: inline-block;
  }

  list-style: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

const Image = styled.li`
  list-style: none;
  padding: 8px;
`

const SortableImage = SortableElement(({ value }) => (
  <Image>
    <img
      src={`/upload/${value.path}`}
      width={128}
      height={128}
    />
  </Image>
))

const ImageList = SortableContainer(({ items = [] }) => {
  return (
    <HorizalList>
      {items.map(
        (image, index) => <SortableImage
          key={`item-${index}`}
          index={index}
          value={image}
        />
      )}
    </HorizalList>
  )
})

class Form extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      asset: {
        hash: this.props.asset.hash,
        published: this.props.asset.published,
        name: this.props.asset.name,
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
      <div>
        <div>{asset.hash}</div>
        <button type="button"
          disabled={asset.published && asset.published.hash === asset.hash}
          onClick={this.publishAsset}>Publish</button>
        <Uploader
          onFileUploaded={ (image) => this.addAssetImage(image) }
        />
        <ImageList
          axis={'x'}
          items={asset.images}
          onSortEnd={this.onSortEnd}
        />
        <input type="text" value={asset.name}
          onChange={ (e) => this.updateAssetState('name', e.target.value) }
        />
        <CKEditor
          editor={ClassicEditor}
          data={asset.description}
          onChange={ (e, editor) => this.updateAssetState('description', editor.getData()) }
        />
      </div>
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
        ...this.state.asset,
        images: this.state.asset.images.map((image) => image._id)
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

export default Form
