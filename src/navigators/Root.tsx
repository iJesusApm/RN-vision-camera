import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import {Example, Startup, Permission} from '@/screens'
import {useTheme} from '@/theme'

import type {ApplicationStackParamList} from '@/types/navigation'

const Stack = createStackNavigator<ApplicationStackParamList>()

function ApplicationNavigator() {
  const {variant, navigationTheme} = useTheme()

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator key={variant} initialRouteName='Permission' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Example" component={Example} />
        <Stack.Screen name="Permission" component={Permission} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
