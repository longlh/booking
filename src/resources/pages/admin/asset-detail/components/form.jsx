import React from 'react'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import styled from 'styled-components'

import Uploader from './uploader'

const EditorWrapper = styled.div`
  border: 1px solid gray;
  padding: 8px;
`

class Form extends React.Component {
  render() {
    return (
      <div>
        <Uploader />
        <CKEditor
          editor={ClassicEditor}
          data=""
        />
      </div>
    )
  }
}

export default Form
