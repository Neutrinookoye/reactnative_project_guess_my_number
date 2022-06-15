import { useState } from 'react'
import { TextInput, View, StyleSheet, Alert } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../constants/colors'

const StartGameScreen = ({ onPickNumber }) => {
	const [enteredNumber, setEnteredNumber] = useState('')

	const numberInputHandler = (enteredText) => {
		setEnteredNumber(enteredText)
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredNumber)

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid Number',
				'Number has to be a number between 1 and 99.',
				[{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
			)
			return
		}
		onPickNumber(chosenNumber)
	}

	const resetInputHandler = () => {
		setEnteredNumber('')
	}

	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.numberInput}
				maxLength={2}
				keyboardType='number-pad'
				autoCapitalize='none'
				value={enteredNumber}
				autoCorrect={false}
				onChangeText={numberInputHandler}
			/>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPressAction={resetInputHandler}>Reset</PrimaryButton>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPressAction={confirmInputHandler}>
						Confirm
					</PrimaryButton>
				</View>
			</View>
		</View>
	)
}

export default StartGameScreen

const styles = StyleSheet.create({
	inputContainer: {
		padding: 16,
		marginTop: 100,
		backgroundColor: Colors.primary800,
		marginHorizontal: 24,
		borderRadius: 8,
		elevation: 15,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 2,
		shadowRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},

	numberInput: {
		height: 50,
		fontSize: 32,
		width: 50,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	buttonsContainer: {
		flexDirection: 'row',
	},

	buttonContainer: {
		flex: 1,
	},
})
