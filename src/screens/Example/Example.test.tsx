import { fireEvent, render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { I18nextProvider } from 'react-i18next';

import { ThemeProvider } from '@/theme';
import i18n from '@/translations';

import Example from './Example';

describe('Example screen should render correctly', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('the user change the language', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<I18nextProvider i18n={i18n}>
						<Example />
				</I18nextProvider>
			</ThemeProvider>
		);

		render(component);

		expect(i18n.language).toBe('en');

		const button = screen.getByTestId('change-language-button');
		expect(button).toBeDefined();
		fireEvent.press(button);

		expect(i18n.language).toBe('fr');
	});

	test('the user change the theme', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<I18nextProvider i18n={i18n}>
						<Example />
				</I18nextProvider>
			</ThemeProvider>
		);

		render(component);

		expect(storage.getString('theme')).toBe('default');

		const button = screen.getByTestId('change-theme-button');
		expect(button).toBeDefined();
		fireEvent.press(button);

		expect(storage.getString('theme')).toBe('dark');
	});
});
