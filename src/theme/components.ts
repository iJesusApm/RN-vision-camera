import {ImageStyle, TextStyle, ViewStyle} from 'react-native'
import type {ComponentTheme} from '@/types/theme/theme'

export default ({layout, backgrounds, fonts, colors}: ComponentTheme) => {
  return {
    buttonCircle: {
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...backgrounds.purple100,
      ...fonts.gray400,
      height: 70,
      width: 70,
      borderRadius: 35,
    },
    circle250: {
      borderRadius: 140,
      height: 250,
      width: 250,
    },
    captureButton: {
      borderRadius: 75,
      height: 75,
      width: 75,
      borderColor: colors.gray50,
      borderWidth: 5,
    },
    rightButton: {
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...backgrounds.gray400,
      ...fonts.gray400,
      height: 50,
      width: 50,
      borderRadius: 35,
    },
  } as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>
}
