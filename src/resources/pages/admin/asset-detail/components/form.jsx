import React from 'react'
import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'

import Uploader from './uploader'

class Form extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(editorState) {
    this.setState({ editorState })
  }

  render() {
    return (
      <div>
        <Uploader />
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default Form
