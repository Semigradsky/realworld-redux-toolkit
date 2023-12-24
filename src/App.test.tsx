import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'

test('renders text', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	)

	expect(getByText(/Hello world/i)).toBeInTheDocument()
})
