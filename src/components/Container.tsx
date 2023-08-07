/* Dependencies */
import React, { Fragment } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Appbar, Badge } from 'react-native-paper'

/* Project */
import { colors, theme } from '../themes'

const Container = ({ children, title, actions }: {
	children: React.ReactNode,
	title: string,
	actions?: {
		color?: HPro.string,
		icon: HPro.string,
		onPress: Function,
		badge?: boolean
	}[]
}) => {

	return (<>
		<StatusBar
			backgroundColor={colors.GREEN_DARK}
			barStyle={'light-content'} />
		<SafeAreaView style={{ flex: 0, backgroundColor: __DEV__ ? 'red' : colors.GREEN_DARK }} />
		<SafeAreaView style={{ flex: 1, backgroundColor: __DEV__ ? 'blue' : colors.GREEN_DARK }}>
			<View style={styles.container}>
				{(Boolean(title) || Boolean(actions?.length))
					&& (<>
						<Appbar.Header statusBarHeight={0}>
							<Appbar.Action
								color={theme.ACCENT}
								icon={'text-account'} />
							<Appbar.Content
								style={{ flex: 1 }}
								color={theme.ACCENT}
								title={title} />
							{actions?.map((action, index) => (<Fragment key={action.icon + index}>
								<View>
									<Appbar.Action
										color={action.color ?? theme.ACCENT}
										icon={action.icon}
										onPress={() => action.onPress()} />
									<Badge
										visible={(action.badge ?? false)}
										size={10}
										style={{ position: 'absolute', top: 15, right: 10 }} />
								</View>
							</Fragment>))}
						</Appbar.Header>
					</>)}
				<KeyboardAvoidingView
					behavior={Platform.select({ android: 'height', ios: 'padding' })}
					style={styles.container}>
					<TouchableWithoutFeedback
						accessible={false}
						onPress={Keyboard.dismiss}
						style={styles.container}>
						{children}
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	</>)
}

export default Container

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.BACKGROUND,
		flex: 1
	}
})
