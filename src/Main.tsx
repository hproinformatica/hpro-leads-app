/* Dependencies */
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

/* Libraries */
import { backendRequest, delayedAlert, setServerIPAddress } from '@hproinformatica/react-native'
import { Divider, TextInput, TouchableRipple } from 'react-native-paper'

/* Components */

import Container from './components/Container'
import { useLoading } from './contexts/loading'
import { loadServerSettings, saveServerSettings } from './data/ServerSettings'
import { colors, theme } from './themes'

function Main() {

	/* Contexts */
	const { setLoading } = useLoading()

	/* States */
	const [nom, setNom] = React.useState<HPro.string>('')
	const [emp, setEmp] = React.useState<HPro.string>('')
	const [ema, setEma] = React.useState<HPro.string>('')
	const [tel, setTel] = React.useState<HPro.string>('')
	const [cel, setCel] = React.useState<HPro.string>('')
	const [niv, setNiv] = React.useState<HPro.string>('1')
	const [obs, setObs] = React.useState<HPro.string>('')

	const [address, setAddress] = React.useState<HPro.string>('')
	const [port, setPort] = React.useState<HPro.string>('')

	/* Refs */
	const nomRef = React.useRef(null)
	const empRef = React.useRef(null)
	const emaRef = React.useRef(null)
	const telRef = React.useRef(null)
	const celRef = React.useRef(null)
	const nivRef = React.useRef(null)
	const obsRef = React.useRef(null)

	const ipRef = React.useRef(null)
	const portRef = React.useRef(null)

	/* Effects */
	React.useEffect(() => {
		loadServerSettings()
			.then(async (serverSettings) => {
				let _address = ''
				let _port = ''

				if (serverSettings) {
					_address = serverSettings.hostname
					_port = serverSettings.port
				} else if (__DEV__) {
					_address = '192.168.0.92'
					_port = '8045'
					await saveServerSettings(_address, _port)
				}

				setAddress(_address)
				setPort(_port)
				setServerIPAddress(_address, _port)
			})
	}, [])

	/* Functions */
	const ToggleChoice = ({ type }) => {
		return (<>
			<TouchableRipple
				borderless
				onPress={() => {
					setNiv(type)
				}}
				style={{
					alignItems: 'center',
					backgroundColor: niv === type ? theme.PRIMARY : '#fff',
					borderRadius: 10,
					flex: 1,
					justifyContent: 'center',
					marginHorizontal: 5
				}}>
				<Text style={{
					color: niv === type ? '#fff' : theme.PRIMARY,
					fontWeight: 'bold'
				}}>
					{type}
				</Text>
			</TouchableRipple>
		</>)
	}

	const handleClear = () => {
		setNom('')
		setEmp('')
		setEma('')
		setTel('')
		setCel('')
		setNiv('1')
		setObs('')
		nomRef.current?.focus()
	}

	return (<>
		<Container
			title={'Cadastro de clientes'}
			actions={[
				{
					icon: 'check',
					onPress: () => {
						delayedAlert('Inclusão das infomações', 'Confirma a inclusão das informações digitadas?', [
							{
								text: 'Sim',
								onPress: async () => {
									if (!address) {
										delayedAlert('Erro', 'O campo "IP" é obrigatório!', [
											{
												text: 'OK',
												onPress: () => {
													ipRef.current?.focus()
												}
											}
										])
										return
									}

									if (!port) {
										delayedAlert('Erro', 'O campo "Porta" é obrigatório!', [
											{
												text: 'OK',
												onPress: () => {
													portRef.current?.focus()
												}
											}
										])
										return
									}

									await saveServerSettings(address, port)

									if (!nom && !emp) {
										delayedAlert('Erro', 'O campo "Nome" ou "Empresa" são obrigatórios!', [
											{
												text: 'OK',
												onPress: () => {
													nomRef.current?.focus()
												}
											}
										])
										return
									}

									if (!ema && !tel && !cel) {
										delayedAlert('Erro', 'É necessário informar pelo menos um contato!', [
											{
												text: 'OK',
												onPress: () => {
													emaRef.current?.focus()
												}
											}
										])
										return
									}

									if (!niv) {
										delayedAlert('Erro', 'É necessário informar o nível de acesso!')
										return
									}

									setLoading(true)
									try {
										await backendRequest('$clientes_incluir', {
											nom, emp, ema, tel, cel, niv, obs
										}, {
											successFunction: () => {
												delayedAlert('Sucesso', 'Informações incluídas com sucesso!', [
													{
														text: 'OK',
														onPress: () => {
															handleClear()
														}
													}
												])
											},
											errorFunction: () => {
												delayedAlert('Erro', 'Não foi possível incluir as informações!')
											}
										})
											.catch(() => {
												delayedAlert('Erro', 'Não foi possível incluir as informações!')
											})
									} finally {
										setLoading(false)
									}
								}
							}, {
								text: 'Não',
								onPress: () => {}
							}
						])
					},
				},
				{
					icon: 'delete',
					onPress: () => {
						delayedAlert('Limpar informações', 'Confirma a limpeza das informações digitadas?',
							[{
								text: 'Sim',
								style: 'destructive',
								onPress: () => {
									handleClear()
								}
							}, {
								text: 'Não',
								onPress: () => {}
							}])
					},
				}
			]}>
			<ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
				<TextInput
					autoFocus
					label={'Nome'}
					maxLength={40}
					mode={'outlined'}
					onChangeText={setNom}
					onSubmitEditing={() => empRef.current?.focus()}
					ref={nomRef}
					returnKeyType={'next'}
					style={{ marginTop: 10 }}
					value={nom} />
				<TextInput
					label={'Empresa'}
					maxLength={40}
					mode={'outlined'}
					onChangeText={setEmp}
					onSubmitEditing={() => emaRef.current?.focus()}
					ref={empRef}
					returnKeyType={'next'}
					style={{ marginTop: 10 }}
					value={emp} />
				<TextInput
					label={'E-mail'}
					maxLength={200}
					mode={'outlined'}
					onChangeText={setEma}
					onSubmitEditing={() => telRef.current?.focus()}
					ref={emaRef}
					returnKeyType={'next'}
					style={{ marginTop: 10 }}
					value={ema} />
				<TextInput
					label={'Telefone'}
					maxLength={20}
					mode={'outlined'}
					onChangeText={setTel}
					onSubmitEditing={() => celRef.current?.focus()}
					ref={telRef}
					returnKeyType={'next'}
					style={{ marginTop: 10 }}
					value={tel} />
				<TextInput
					label={'Celular'}
					maxLength={20}
					mode={'outlined'}
					onChangeText={setCel}
					onSubmitEditing={() => nivRef.current?.focus()}
					ref={celRef}
					returnKeyType={'next'}
					style={{ marginTop: 10 }}
					value={cel} />
				<TextInput
					label={'Observações'}
					mode={'outlined'}
					onChangeText={setObs}
					onSubmitEditing={() => obsRef.current?.focus()}
					ref={obsRef}
					returnKeyType={'default'}
					style={{ marginTop: 10 }}
					value={obs}
					numberOfLines={15}
					multiline />
				<Divider style={{ backgroundColor: colors.BLACK, height: 1, marginTop: 10 }} />
				<View>
					<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
						<Text style={{ alignSelf: 'center', flex: 1, fontWeight: 'bold', fontSize: 20 }}>
							{'Nível'}
						</Text>
					</View>
					<View style={{ flexDirection: 'row', height: 40, marginTop: 10 }}>
						<ToggleChoice type={'1'} />
						<ToggleChoice type={'2'} />
						<ToggleChoice type={'3'} />
					</View>
				</View>
				<Divider style={{ backgroundColor: colors.BLACK, height: 1, marginTop: 10 }} />
				<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
					<Text style={{ alignSelf: 'center', flex: 1, fontWeight: 'bold', fontSize: 20 }}>
						{'Configurações do servidor'}
					</Text>
				</View>
				<TextInput
					label={'Endereço do servidor'}
					mode={'outlined'}
					onChangeText={(value) => {
						setAddress(value)
						setServerIPAddress(value, port)
					}}
					ref={ipRef}
					style={{ marginTop: 10 }}
					value={address} />
				<TextInput
					label={'Porta'}
					mode={'outlined'}
					onChangeText={(value) => {
						setPort(value)
						setServerIPAddress(address, value)
					}}
					ref={portRef}
					style={{ marginTop: 10 }}
					value={port} />
				<View style={{ height: 50 }} />
			</ScrollView>
		</Container>
	</>)
}

export default Main
