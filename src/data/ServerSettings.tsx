/* Dependenies */
import { delayedAlert } from '@hproinformatica/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

/* Constants */
const SERVER_SETTINGS_KEY = 'SERVERSETTINGS'

class ServerSettings {
	hostname: string
	port: string

	constructor(hostname: string, port: string) {
		this.hostname = hostname
		this.port = port
	}
}

export async function saveServerSettings(hostname: string, port: string) {
	try {
		const serverSettings = new ServerSettings(hostname, port)
		await AsyncStorage.setItem(SERVER_SETTINGS_KEY, JSON.stringify(serverSettings))

	} catch (error) {
		delayedAlert('Erro', error.message)
	}
}

export async function loadServerSettings(): Promise<{
	hostname: string
	port: string
}> {
	try {
		const serverSettings = await AsyncStorage.getItem(SERVER_SETTINGS_KEY)
		if (!serverSettings)
			return null

		return JSON.parse(serverSettings)

	} catch (error) {
		delayedAlert('Erro', error.message)
	}
}

export async function clearServerSettings() {
	try {
		await AsyncStorage.removeItem(SERVER_SETTINGS_KEY)

	} catch (error) {
		delayedAlert('Erro', error.message)
	}
}
