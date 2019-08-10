import React from 'react'
import request from 'superagent'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import styled from 'styled-components'

import Uploader from './uploader'

const EditorWrapper = styled.div`
  border: 1px solid gray;
  padding: 8px;
`

class Form extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      asset: {
        name: 'Example',
        description: 'Lorem ipsum dolor sit amet, sollicitudin ultrices diam non in, purus in laoreet, porta conubia ipsum quis, at ac enim ac, donec ligula fermentum quisque metus. Sit blandit a vel non proin dolor.',
        images: [],
        price: ''
      }
    }

    this.saveAsset = this.saveAsset.bind(this)
    this.updateAssetState = this.updateAssetState.bind(this)
    this.addAssetImage = this.addAssetImage.bind(this)
  }

  render() {
    return (
      <div>
        <Uploader
          onFileUploaded={ (image) => this.addAssetImage(image) }
        />
        <CKEditor
          editor={ClassicEditor}
          data={this.state.asset.description}
          onChange={ (e, editor) => this.updateAssetState('description', editor.getData()) }
        />
        <form onSubmit={this.saveAsset}>
          <input type="text" value={this.state.asset.name}
            onChange={ (e) => this.updateAssetState('name', e.target.value) }
          />
          <button type="submit">Save</button>
        </form>

      </div>
    )
  }

  async saveAsset(e) {
    e.preventDefault()

    console.log(this.state.asset)

    // send ajax
    await request.post('/admin/assets')
      .send(this.state.asset)

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
