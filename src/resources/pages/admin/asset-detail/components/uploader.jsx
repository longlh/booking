import plupload from 'plupload'
import React from 'react'
import styled from 'styled-components'

const DropZone = styled.div`
  background: yellow;
  width: 640px;
  height: 320px;
  margin: 0 auto;
`

const FileList = ({ files = [] }) => {
  return (
    <ul>
      { files.map((file) => (
        <li key={file.id}>{ file.name }</li>
      )) }
    </ul>
  )
}

class Uploader extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      queue: []
    }
  }

  componentDidMount() {
    console.log('xxx', this.refs.dropzone)

    const uploader = this._uploader = new plupload.Uploader({
      browse_button: this.refs.browseButton,
      drop_element: this.refs.dropzone
    })

    // handle event
    uploader.bind('QueueChanged', (uploader) => {
      this.setState({
        queue: uploader.files
      })
    })

    uploader.init()
  }

  componentWillMount() {
    if (this._uploader) {
      this._uploader.destroy()
    }
  }

  render() {
    return (
      <div>
        <h2>Uploader</h2>
        <button type="button" ref="browseButton">Choose files</button>
        <button type="button" ref="submitButton">Upload</button>
        <DropZone ref="dropzone" />
        <FileList files={this.state.queue} />
      </div>
    )
  }
}

export default Uploader
