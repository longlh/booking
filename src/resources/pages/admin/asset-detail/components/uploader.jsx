import plupload from 'plupload'
import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Button, Divider, Header, List, Icon, Image, Ref, Segment } from 'semantic-ui-react'

const Thumbnail = styled(Image)`
  width: 36px;
  height: 36px;
`

const NoBreakText = styled.span`
  whitespace: nowrap;
`

const FileList = ({
  files = [],
  previews = {},
  onRemove
}) => {
  return (
    <List verticalAlign='middle'>
      { files.map((file) => (
        <List.Item key={file.id}>
          <List.Content floated='right'>
            <Button icon onClick={() => onRemove(file.id)}>
              <Icon name='trash' />
            </Button>
          </List.Content>
          <Thumbnail src={previews[file.id]} />
          <List.Content>
            <NoBreakText>{file.name}</NoBreakText>
          </List.Content>
        </List.Item>
      )) }
    </List>
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
    const uploader = this._uploader = new plupload.Uploader({
      browse_button: this.refs.browserButton.ref.current,
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
            <Header textAlign='center'>
              No images in upload queue.
            </Header>
          }
          <Segment.Inline>
            <Button ref="browserButton">Choose images</Button>
            {this.state.queue && this.state.queue.length > 0 && (
              <Button primary onClick={() => this._uploader.start()}>Upload</Button>
            )}
          </Segment.Inline>
        </Segment>
      </Fragment>
    )
  }
}

export default Uploader
