import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class OnboardingScreenProfile extends Component {
	render() {
		return (
			<View style={styles.mainContentStyle}>
				<TouchableOpacity
					onPress={() => Actions.pop()}
					style={{
						flex: 1,
            			alignItems: 'center',
            			justifyContent: 'center'
					}}
				>
					<View style={styles.imageStyle}>
						<Image
							source={require('../../../resources/img/onboarding/SwipeIcon.png')}
						/>
					</View>
					<Text style={styles.textStyle}>
						Bun venit in sectiunea profil. Swipe spre dreapta pentru a descoperi
						profile noi.
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	mainContentStyle: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.8)'
	},
	textStyle: {
		color: 'white',
		textAlign: 'center',
    width: 220
	},
	imageStyle: {
		height: 150,
		width: 100
	}
};

export default OnboardingScreenProfile;
