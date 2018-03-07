import React from 'react';
import { View } from 'react-native';
 
const Card = ({ children, style }) => { 
    const { cardStyle } = styles;
    
    return (
        <View style={[cardStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    cardStyle: {
        borderWidth: 0.1,
        borderRadius: 8,
        borderColor: '#A8A8A8',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },
};

export { Card };
