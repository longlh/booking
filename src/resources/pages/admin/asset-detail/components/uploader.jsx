import plupload from 'plupload'
import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Button, Header, Icon, Ref, Segment } from 'semantic-ui-react'

const DropZone = styled.div`
  background: yellow;
  min-height: 128px;
  margin: 0 auto;
`

const FileList = ({
  files = [],
  previews = {},
  onRemove
}) => {
  return (
    <ul>
      { files.map((file) => (
        <li key={file.id}>
          <img
            src={previews[file.id]}
            width={64}
            height={64}
           />
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
      queue: [],
      previews: {}
    }
  }

  componentDidMount() {
    console.log(this.refs.xxx)

    const uploader = this._uploader = new plupload.Uploader({
      browse_button: this.refs.browserButton.ref.current,
      // browse_button: this.refs.xxx,
      // drop_element: this.refs.dropzone,
      url: '/admin/images',
      chunk_size: '200kb',
      unique_names: true,
      filters : {
        prevent_duplicates: true
      }
    })

    uploader.bind('FilesAdded', (uploader, files) => {
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          this.setState({
            previews: {
              ...this.state.previews,
              [file.id]: reader.result
            }
          })
        }

        reader.readAsDataURL(file.getNative())
      })
    })

    uploader.bind('FilesRemoved', (uploader, files) => {
      const previews = files.reduce((state, file) => {
        const { [file.id]: removed, ...reducedState } = state

        return reducedState
      }, this.state.previews)

      this.setState({ previews })
    })

    // handle event
    uploader.bind('QueueChanged', (uploader) => {
      this.setState({
        queue: uploader.files
      })
    })

    uploader.bind('FileUploaded', (uploader, file, result) => {
      if (!this.props.onFileUploaded) {
        return
      }

      // parse JSON
      const { path } = JSON.parse(result.response)

      this.props.onFileUploaded(path)
    })

    uploader.bind('UploadComplete', (uploader) => {
      uploader.files.length = 0

      uploader.trigger('QueueChanged')
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
      <Fragment>
        <Segment placeholder>
          {this.state.queue && this.state.queue.length > 0 ?
            <FileList
              files={this.state.queue}
              previews={this.state.previews}
              onRemove={(id) => this._uploader.removeFile(id)}
            /> :
            <Header icon>
              <Icon name='file image outline' size='tiny' />
              No images are choosed to upload.
            </Header>
          }
          <Button.Group>
            <Button ref="browserButton">Choose images</Button>
            {this.state.queue && this.state.queue.length > 0 &&
              <Button primary onClick={() => this._uploader.start()}>Upload</Button>
            }
          </Button.Group>
        </Segment>
      </Fragment>
    )
  }
}

export default Uploader
