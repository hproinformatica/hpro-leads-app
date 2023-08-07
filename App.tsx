/* Libraries */
import { Provider as PaperProvider } from 'react-native-paper'

/* Contexts */
import LoadingProvider from './src/contexts/loading'

/*  Project */
import { paperTheme } from './src/themes'

import Main from './src/Main'

const App = () => {
	return (<>
		<LoadingProvider>
				<PaperProvider theme={paperTheme}>
					<Main />
				</PaperProvider>
		</LoadingProvider>
	</>)
}

export default App
