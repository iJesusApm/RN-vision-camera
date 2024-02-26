import {View, DimensionValue} from 'react-native'

import Camera from '@/theme/assets/images/camera.png'

import {ImageVariant} from '@/components/atoms'
import {useTheme} from '@/theme'
import {isImageSourcePropType} from '@/types/guards/image'

type Props = {
  height?: DimensionValue
  width?: DimensionValue
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

function Brand({height, width, mode}: Props) {
  const {layout} = useTheme()

  if (!isImageSourcePropType(Camera)) {
    throw new Error('Image source is not valid')
  }

  return (
    <View testID="brand-img-wrapper" style={{height, width}}>
      <ImageVariant
        testID="brand-img"
        style={[layout.fullHeight, layout.fullWidth]}
        source={Camera}
        sourceDark={Camera}
        resizeMode={mode}
      />
    </View>
  )
}

Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
}

export default Brand
