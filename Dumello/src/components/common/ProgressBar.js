import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxValue: props.maxValue || 0,
            currentValue: props.currentValue || 0,
            color: props.color || 'gray'
        };
        this.flexValue = new Animated.Value(this.state.currentValue / this.state.maxValue);
    }

    componentWillReceiveProps(nextProps) {
        const newFlexValue = nextProps.currentValue / this.state.maxValue;
        Animated.timing(this.flexValue, {
            toValue: newFlexValue,
            duration: 1050,
            easing: Easing.linear,
        }).start();
    }

    render() {
        const foregroundViewStyle = {
            backgroundColor: this.state.color,
            flex: this.flexValue,
        };

        return (
            <View style={styles.backgroundViewStyle} >
                <Animated.View style={foregroundViewStyle} />
            </ View>
        );
    }
}

const styles = {
    backgroundViewStyle: {
        height: 2,
        marginHorizontal: 12,
        paddingHorizontal: 2,
        backgroundColor: '#9A9A9A33',
        flexDirection: 'row',
    },
};

export { ProgressBar };
