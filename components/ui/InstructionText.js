import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/colors'
import React from 'react'

function InstructionText({ children, style }) {
	return <Text style={[styles.instructionText, style]}>{children}</Text>
}

export default InstructionText

const styles = StyleSheet.create({
	instructionText: {
		color: Colors.accent500,
		fontSize: 24,
		textAlign: 'center',
	},
})
