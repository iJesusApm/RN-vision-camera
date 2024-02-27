import React, {useState, useCallback, useMemo, useRef} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

import {useCameraDevice, Camera, useCameraFormat, Templates, PhotoFile} from 'react-native-vision-camera'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import {SafeScreen} from '@/components/template'
import {useTheme} from '@/theme'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useIsForeground} from '@/hooks/useIsForeground'
import Carrousel from '@/components/molecules/Carrousel/Carrousel'

const CameraScreen = () => {
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back')
  const [flash, setFlash] = useState<'off' | 'on'>('off')
  const [enableHdr, setEnableHdr] = useState(false)
  const [enableNightMode, setEnableNightMode] = useState(false)
  const [targetFps, setTargetFps] = useState(60)
  const [isCameraInitialized, setIsCameraInitialized] = useState(false)

  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground

  const camera = useRef<Camera>(null)
  const navigation = useNavigation()

  const device = useCameraDevice(cameraPosition, {
    physicalDevices: ['wide-angle-camera'],
  })

  const {layout, gutters, fonts, components} = useTheme()

  const format = useCameraFormat(device, [
    ...Templates.Instagram,
    {fps: targetFps},
    {photoHdr: enableHdr},
    {photoResolution: 'max'},
  ])

  const fps = Math.min(format?.maxFps ?? 1, targetFps)
  const isEnabled = isCameraInitialized && isActive

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true)
  }, [])

  const onFlipCamera = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'))
  }, [])

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'))
  }, [])

  const onMediaCaptured = useCallback(
    (media: PhotoFile) => {
      console.log(`Media captured! ${JSON.stringify(media)}`)
      navigation.navigate('Media', {
        path: media.path,
        type: 'photo',
      })
    },
    [navigation]
  )

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!')

      const photo = await camera.current?.takePhoto({
        flash,
      })
      onMediaCaptured(photo)
    } catch (e) {
      console.error('Failed to take photo!', e)
    }
  }, [camera, flash])

  if (device == null)
    return (
      <View style={[layout.itemsCenter, layout.justifyCenter, layout.flex_1]}>
        <Text style={[fonts.gray400, fonts.bold, fonts.size_24, gutters.marginVertical_12]}>
          Camera device not found
        </Text>
      </View>
    )

  return (
    <SafeScreen>
      <>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          isActive={isActive}
          photoHdr={format?.supportsPhotoHdr && enableHdr}
          fps={fps}
          lowLightBoost={device.supportsLowLightBoost && enableNightMode}
          photo={true}
          onInitialized={onInitialized}
        />

        <View style={[layout.absolute, gutters.padding_12, {right: 10, top: 50}]}>
          <TouchableOpacity style={components.rightButton} onPress={onFlipCamera}>
            <IonIcon name="camera-reverse" color="white" size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={[components.rightButton, gutters.marginTop_32]} onPress={onFlashPressed}>
            <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[components.rightButton, gutters.marginTop_32]}
            onPress={() => setEnableHdr(h => !h)}>
            <MaterialIcon name={enableHdr ? 'hdr' : 'hdr-off'} color="white" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[components.rightButton, gutters.marginTop_32]}
            onPress={() => setTargetFps(t => (t === 30 ? 60 : 30))}>
            <Text style={[fonts.size_12, fonts.gray50, fonts.bold, fonts.uppercase]}>{`${targetFps}\nFPS`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[components.rightButton, gutters.marginTop_32]}
            onPress={() => setEnableNightMode(!enableNightMode)}
            disabled={!isEnabled}>
            <IonIcon name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
          </TouchableOpacity>
        </View>

        <View style={[layout.absolute, layout.itemsCenter, layout.bottom0, layout.fullWidth, gutters.marginBottom_80]}>
          <TouchableOpacity testID="grant-permission-button" style={[components.captureButton]} onPress={takePhoto} />
        </View>
      </>
    </SafeScreen>
  )
}

export default CameraScreen
