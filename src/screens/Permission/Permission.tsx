import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Linking} from 'react-native'

import {Camera, CameraPermissionStatus} from 'react-native-vision-camera'

import {Brand} from '@/components/molecules'
import {SafeScreen} from '@/components/template'
import {useTheme} from '@/theme'

const PermissionScreen = () => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')
  const {layout, gutters, fonts, components, backgrounds} = useTheme()

  const navigation = useNavigation()

  const requestCameraPermission = async () => {
    console.log('Requesting camera permission...')
    const permission = await Camera.requestCameraPermission()

    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }

  useEffect(() => {
    if (cameraPermissionStatus === 'granted') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Camera' as never}],
      })
    }
  }, [cameraPermissionStatus, navigation])

  return (
    <SafeScreen>
      <ScrollView>
        <View style={[layout.justifyCenter, layout.itemsCenter, gutters.marginTop_24]}>
          <View style={[layout.relative, backgrounds.gray100, components.circle250]} />

          <View style={[layout.absolute, gutters.paddingTop_40, gutters.paddingLeft_80]}>
            <Brand height={300} width={500} />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32]}>
          <View style={[gutters.marginTop_80]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>Welcome</Text>
            <Text style={[fonts.gray400, fonts.bold, fonts.size_24, gutters.marginVertical_12]}>
              The Vision Camera needs permission
            </Text>
          </View>

          <View style={[layout.row, layout.justifyCenter, layout.fullWidth]}>
            <TouchableOpacity
              testID="grant-permission-button"
              style={[components.buttonCircle, gutters.marginVertical_24]}
              onPress={requestCameraPermission}>
              <Text style={[fonts.size_16, fonts.gray800, fonts.bold, fonts.uppercase]}>Grant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  )
}

export default PermissionScreen
