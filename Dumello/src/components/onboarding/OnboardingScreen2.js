import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const OnboardingScreen2 = () => {
	const { viewStyle, imageStyle, textStyle } = styles;
	return (
		<View style={viewStyle}>
			<TouchableOpacity
				onPress={() => Actions.pop()}
				style={{
					flex: 1,
					flexDirection: 'column', 
					justifyContent: 'space-between'
				}}
			>
				<View style={{ width: 50, height: 50, backgroundColor: 'powderblue', paddingLeft: 30, paddingBottom: 10 }}>
					<Image
						source={require('../../../resources/img/auto_play_on/AutoPlayOn.png')}
					/>
				</View>
				<View style={{ width: 50, height: 50, paddingLeft: 80, backgroundColor: 'green' }}>
					<Image
						source={require('../../../resources/img/info_arrow/infoArrow.png')}
					/>
				</View>
				<View style={{ alignItems: 'center', width: 20, height: 30 }}>
					<Text style={styles.textStyle}>BLA BLA LA </Text>
				</View>
			</TouchableOpacity>
		</View>
	);

}

const styles = {
	viewStyle: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	imageStyle: {
		height: 150,
		width: 100
	},
	textStyle: {
		textColor: 'red',
		textAlign: 'center',
		width: 220
	}
}

export default OnboardingScreen2;
