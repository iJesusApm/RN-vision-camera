import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {Camera} from 'react-native-vision-camera'

import {Permission, Camera as CameraScreen} from '@/screens'
import {useTheme} from '@/theme'

import type {ApplicationStackParamList} from '@/types/navigation'

const Stack = createStackNavigator<ApplicationStackParamList>()

function ApplicationNavigator() {
  const {variant, navigationTheme} = useTheme()
  const cameraPermission = Camera.getCameraPermissionStatus()

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`)

  const showPermissionsPage = cameraPermission !== 'granted'

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        key={variant}
        initialRouteName={showPermissionsPage ? 'Permission' : 'Camera'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Permission" component={Permission} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
