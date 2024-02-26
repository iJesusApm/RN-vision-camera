import 'react-native-gesture-handler'
import {MMKV} from 'react-native-mmkv'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import {ThemeProvider} from '@/theme'

import ApplicationNavigator from './navigators/Root'
import './translations'

export const storage = new MMKV()
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storage={storage}>
        <ApplicationNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
