import { useState } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App() {
	const [userNumber, setUserNumber] = useState(null)
	const [gameIsOver, setGameIsOver] = useState(true)
	const [guessRounds, setGuessRounds] = useState(0)
	const [guessRoundCounter, setGuessRoundCounter] = useState(0)

	// const [fontsLoaded] = useFonts({
	// 	'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
	// 	'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	// })

	const fetchFonts = () => {
		return Font.loadAsync({
			'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
		})
	}

	// if (!fontsLoaded) {
	// 	return <AppLoading />
	// }

	const [isDataLoaded, setIsDataLoaded] = useState(false)

	if (!isDataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setIsDataLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		)
	}

	function pickedNumberHandler(pickedNumber) {
		setUserNumber(pickedNumber)
		setGameIsOver(false)
	}

	function gameOverHandler() {
		setGameIsOver(true)
	}

	function startNewGameHandler() {
		setUserNumber(null)
		setGuessRounds(0)
	}

	function guessRoundCounterHandler(guessRoundCount) {
		setGuessRoundCounter(guessRoundCount)
	}

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

	if (userNumber) {
		screen = (
			<GameScreen
				userNumber={userNumber}
				onGameOver={gameOverHandler}
				onGuessRound={guessRoundCounterHandler}
			/>
		)
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRoundCounter}
				onStartNewGame={startNewGameHandler}
			/>
		)
	}

	return (
		<>
			<StatusBar style='light' />
			<LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
				<ImageBackground
					source={require('./assets/images/background.png')}
					resizeMode='cover'
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	)
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},

	backgroundImage: {
		opacity: 0.15,
	},
})
