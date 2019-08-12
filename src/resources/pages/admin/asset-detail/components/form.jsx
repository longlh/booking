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
        name: this.props.asset.name,
        description: this.props.asset.description,
        price: this.props.asset.price,
        images: [
          ...this.props.asset.images
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
    }))
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.publishAsset}>Publish</button>
        <Uploader
          onFileUploaded={ (image) => this.addAssetImage(image) }
        />
        <ImageList
          axis={'x'}
          items={this.state.asset.images}
          onSortEnd={this.onSortEnd}
        />
        <form onSubmit={this.saveAsset}>
          <input type="text" value={this.state.asset.name}
            onChange={ (e) => this.updateAssetState('name', e.target.value) }
          />
          <CKEditor
            editor={ClassicEditor}
            data={this.state.asset.description}
            onChange={ (e, editor) => this.updateAssetState('description', editor.getData()) }
          />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }

  async publishAsset(e) {
    e.preventDefault()

    await request.post(`/admin/assets/${this.props.asset._id}/publish`)

    return false
  }

  async saveAsset(e) {
    e.preventDefault()

    // send ajax
    await request.post(`/admin/assets/${this.props.asset._id}`)
      .send({
        id: this.props.asset._id,
        ...this.state.asset
      })

    return false
  }

  updateAssetState(field, value) {
    this.setState({
      asset: {
        ...this.state.asset,
        [field]: value
      }
    })
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
    })
  }
}

export default Form
