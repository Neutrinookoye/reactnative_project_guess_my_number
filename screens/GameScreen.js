import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude)
	} else {
		return rndNum
	}
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userNumber, onGameOver }) => {
	const initialGuess = generateRandomBetween(1, 100, userNumber)
	const [currentGuess, setCurrentGuess] = useState(initialGuess)

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver()
		}

		//   return () => {
		// 	second
		//   }
	}, [currentGuess, userNumber, onGameOver])

	function nextGuessHandler(direction) {
		if (
			(direction === 'lower' && currentGuess < userNumber) ||
			(direction === 'greater' && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie", 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel' },
			])
			return
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess
		} else {
			minBoundary = currentGuess + 1
		}
		console.log(minBoundary, maxBoundary)
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		)

		setCurrentGuess(newRndNumber)
	}

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			<NumberContainer> {currentGuess} </NumberContainer>
			<View>
				<Text style={styles.para}>Higher of Lower</Text>
				<View style={styles.flexButton}>
					<View style={styles.flexButton1}>
						<PrimaryButton onPressAction={nextGuessHandler.bind(this, 'lower')}>
							-
						</PrimaryButton>
					</View>
					<View style={styles.flexButton1}>
						<PrimaryButton
							onPressAction={nextGuessHandler.bind(this, 'greater')}
						>
							+
						</PrimaryButton>
					</View>
				</View>
			</View>
			{/* <View>LOG ROUNDS</View> */}
		</View>
	)
}

export default GameScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
	},

	para: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
	},

	flexButton: {
		flexDirection: 'row',
	},

	flexButton1: {
		flex: 1,
	},
})
