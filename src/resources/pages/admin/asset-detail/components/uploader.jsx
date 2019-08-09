import plupload from 'plupload'
import React from 'react'
import styled from 'styled-components'

const DropZone = styled.div`
  background: yellow;
  width: 640px;
  height: 320px;
  margin: 0 auto;
`

const FileList = ({
  files = [],
  onRemove
}) => {
  return (
    <ul>
      { files.map((file) => (
        <li key={file.id}>
          <span>{file.name}</span>
          <button type="button"
            onClick={ () => onRemove(file.id) }>
            Remove
           </button>
        </li>
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

  componentWillUnmount() {
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
        <FileList
          files={this.state.queue}
          onRemove={ (id) => {
            this._uploader.removeFile(id)
          } }
        />
      </div>
    )
  }
}

export default Uploader
