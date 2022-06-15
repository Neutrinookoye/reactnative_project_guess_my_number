import { StyleSheet, Text, View, Pressable } from 'react-native'

const PrimaryButton = ({ children, onPressAction }) => {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [styles.buttonInnerContainer, styles.presed]
						: styles.buttonInnerContainer
				}
				onPress={onPressAction}
				android_ripple={{ color: '#640233' }}
			>
				<Text style={styles.buttonText}> {children} </Text>
			</Pressable>
		</View>
	)
}

export default PrimaryButton

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
	},

	buttonInnerContainer: {
		backgroundColor: '#72063c',

		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 5,

		shadowColor: 'white',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 2,
		shadowRadius: 6,
	},

	buttonText: {
		color: 'white',
		textAlign: 'center',
	},

	presed: {
		opacity: 0.75,
	},
})
