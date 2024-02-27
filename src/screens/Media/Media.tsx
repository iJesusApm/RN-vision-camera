import React, {useCallback, useMemo, useState} from 'react'
import {StyleSheet, View, ActivityIndicator, PermissionsAndroid, Platform, Alert, TouchableOpacity} from 'react-native'
import FastImage, {OnLoadEvent} from 'react-native-fast-image'

import type {StackScreenProps} from '@react-navigation/stack'
import {ApplicationStackParamList} from '@/types/navigation'

import {useNavigation} from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {savePicture} from '@/hooks/useCameraRoll'

const requestSavePermission = async (): Promise<boolean> => {
  // On Android 13 and above, scoped storage is used instead and no permission is needed
  if (Platform.OS !== 'android' || Platform.Version >= 33) {
    return true
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  if (permission == null) {
    return false
  }

  let hasPermission = await PermissionsAndroid.check(permission)
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(permission)
    hasPermission = permissionRequestResult === 'granted'
  }

  return hasPermission
}

type Props = StackScreenProps<ApplicationStackParamList, 'Media'>

const MediaScreen = ({route}: Props) => {
  const {path, type} = route.params
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false)
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none')
  const navigation = useNavigation()

  const onMediaLoad = useCallback((event: OnLoadEvent) => {
    console.log(`Image loaded. Size: ${event.nativeEvent.width}x${event.nativeEvent.height}`)
  }, [])

  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.')
    setHasMediaLoaded(true)
  }, [])

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving')

      const hasPermission = await requestSavePermission()
      if (!hasPermission) {
        Alert.alert(
          'Permission denied!',
          'Vision Camera does not have permission to save the media to your camera roll.'
        )
        setSavingState('none')
        return
      }
      await savePicture(`file://${path}`, type)
      setSavingState('saved')
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      setSavingState('none')
      Alert.alert('Failed to save!', `An unexpected error occured while trying to save your ${type}. ${message}`)
    }
  }, [path, type])

  const source = useMemo(() => ({uri: `file://${path}`}), [path])

  const screenStyle = useMemo(() => ({opacity: hasMediaLoaded ? 1 : 0}), [hasMediaLoaded])

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <FastImage
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={onMediaLoadEnd}
          onLoad={onMediaLoad}
        />
      )}

      <TouchableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={onSavePressed} disabled={savingState !== 'none'}>
        {savingState === 'none' && <IonIcon name="download" size={35} color="white" style={styles.icon} />}
        {savingState === 'saved' && <IonIcon name="checkmark" size={35} color="white" style={styles.icon} />}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
})

export default MediaScreen
