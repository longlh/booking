import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import { Button, Image } from 'semantic-ui-react'

import styled from 'styled-components'

const Thumbnail = styled(Image)`
  line-height: 150px;
  overflow: hidden;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  display: inline-block;
  text-align: center;
`

Thumbnail.Content = styled.div`
  margin-left: -999px;
  margin-right: 999px;
`

const SortableImage = SortableElement(({ value, onRemove }) => (
    <Thumbnail image={`/upload/${value}`}>
      <Button negative icon='trash' circular onClick={onRemove} />
    </Thumbnail>
))

export default SortableContainer(({ items = [], onRemove }) => {
  return (
    <Image.Group size='small'>
      {items.map(
        (image, index) => <SortableImage
          key={`item-${index}`}
          index={index}
          value={image}
          onRemove={() => onRemove(index)}
        />
      )}
    </Image.Group>
  )
})
