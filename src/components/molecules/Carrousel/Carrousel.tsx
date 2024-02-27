import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import {CameraRoll, PhotoIdentifier} from '@react-native-camera-roll/camera-roll'
import FastImage from 'react-native-fast-image'

const Carrousel = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([])
  useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        const data = r.edges
        setPhotos(data)
      })
      .catch(err => {
        //Error Loading Images
      })
  }, [])

  if (!photos || photos.length === 0) {
    return null
  }

  return (
    <FlatList
      data={photos}
      horizontal
      renderItem={({item}) => (
        <FastImage
          source={{uri: item.node.image.uri}}
          style={{
            width: 120,
            height: 120,
          }}
          resizeMode="contain"
        />
      )}
      keyExtractor={item => `${item.node.id}`}
    />
  )
}

export default Carrousel
