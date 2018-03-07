import React, { Component } from 'react';
import { TouchableOpacity, Animated } from 'react-native';

class Icon extends Component {
    // = ({ onPress, style, source, toggleType, active, activeImage, activeColor }) => {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(1);
        this.state = { active: props.active || false };
    }

    spring() {
        this.springValue.setValue(0.3);
        this.setState({ active: !this.state.active });
        Animated.sequence([
            Animated.delay(50),
            Animated.spring(
                this.springValue,
                {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true,
                }),
        ]).start((status) => {
            if (this.props.onPress && status.finished) {
                this.props.onPress(this.state.active);
            }
        });
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.iconViewStyle, this.props.style]}
                onPressIn={this.props.onPressIn}
                onPress={this.props.toggleType ? this.spring.bind(this) : this.props.onPress}
            >
                <Animated.Image
                    source={(this.state.active) ? (this.props.activeImage || this.props.source) : this.props.source}
                    style={[
                        { alignSelf: 'center' },
                        this.state.active && { tintColor: this.props.activeColor },
                        { transform: [{ scale: this.springValue }] }
                    ]}
                />
            </TouchableOpacity>
        );
    }
}

const styles = {
    iconViewStyle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 5,

    }
};

export { Icon };
