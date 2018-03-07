import React from 'react';
import { View, Image } from 'react-native';

const StarRating = ({ coloured }) => {
	const { backgroundViewStyle } = styles;
	const maxElems = 5;

	const array = new Array(maxElems).fill(undefined).map((val, idx) => idx);

	return (
		<View style={backgroundViewStyle}>
			{array.map(elem => {
				if (elem < coloured) {
					return (
						<Image
							key={elem}
							source={require('../../../resources/img/star/StarFull.png')}
						/>
					);
				}
				return (
					<Image
						key={elem}
						source={require('../../../resources/img/star/StarEmpty.png')}
					/>
				);
			})}
		</View>
	);
};

const styles = {
	backgroundViewStyle: {
		height: 35,
		marginTop: 20,
		paddingHorizontal: 2,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
};

export { StarRating };
