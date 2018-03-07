import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

const BackButton = () => {
    const { backButtonStyle, backTextStyle } = styles
    return (

        <TouchableOpacity onPress={() => { Actions.pop()} }
            style={backButtonStyle} >
            <Text style={backTextStyle}> &lt;  Duma inapoi</Text>
        </TouchableOpacity>

    );
};

const styles = {
    backButtonStyle: {
        marginLeft: 15,
        height: 20,
        width: 150,
        backgroundColor: '#FFBE1A',

    },
    backTextStyle: {
        fontFamily: 'Arial Rounded MT Bold',
        color: '#fff'
    }

};

export { BackButton };
