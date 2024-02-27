import type {StackScreenProps} from '@react-navigation/stack'

export type ApplicationStackParamList = {
  Permission: undefined
  Camera: undefined
  Media: {
    path: string
    type: 'photo'
  }
}

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>
