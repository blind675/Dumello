import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => {
   return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonBaseStyle, style]}>
            {children}
        </TouchableOpacity>
    );
};

const styles = {
    buttonBaseStyle: {
        height: 40,
        width: 200,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,      
    },
  
};

export { Button };
