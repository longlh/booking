import hash from '@emotion/hash'
import objectPick from 'object.pick'

export const calculateHash = (asset) => {
  const value = getRawValues(asset)

  console.log(JSON.stringify(value))

  return hash(JSON.stringify(value))
}

export const getRawValues = (asset) => {
  return objectPick(asset, [
    'name',
    'description',
    'price',
    'images',
    'options'
  ])
}

export default {
  calculateHash,
  getRawValues
}
