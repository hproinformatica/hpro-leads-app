/* Dependencies */
import React, { createContext, useContext, useState } from 'react'
import { Loader } from '@hproinformatica/react-native'

/* Types */
interface ContextProps {
	loading: boolean
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface ProviderProps {
	children: React.ReactNode
}

/* Contexts */
export const LoadingContext = createContext({} as ContextProps)

/* Providers */
export default function LoadingProvider({ children }: ProviderProps) {
	/* States */
	const [loading, setLoading] = useState<boolean>(false)

	return (
		<LoadingContext.Provider value={{
			loading, setLoading
		}}>
			<Loader.Circle visible={loading} />
			{children}
		</LoadingContext.Provider>
	)
}

/* useContexts */
export function useLoading() {
	return useContext(LoadingContext)
}
