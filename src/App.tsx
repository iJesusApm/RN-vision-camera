import 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';

import ApplicationNavigator from './navigators/Root';
import './translations';

export const storage = new MMKV();

function App() {
	return (
		<ThemeProvider storage={storage}>
			<ApplicationNavigator />
		</ThemeProvider>
	);
}

export default App;
