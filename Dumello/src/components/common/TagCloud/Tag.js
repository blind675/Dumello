import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selected: this.props.selected 
        };
    }

    render() {
        return (
            <TouchableOpacity
                disabled={this.props.unselectable}
                onPress={() => {
                    this.setState({ selected: !this.state.selected });
                    if (this.props.onSelect) {
                        this.props.onSelect(this.state.selected);
                    }
                }}
                style={(this.props.small) ? [
                    styles.tabSelectedSmallStyle, { backgroundColor: this.props.backgroundColor }] :
                    (this.state.selected) ? styles.tabSelectedStyle : styles.tabUnselectedStyle}
            >
                <Text
                    style={(this.props.small) ? styles.textSelectedSmallStyle : (this.state.selected) ? styles.textSelectedStyle : styles.textUnselectedStyle}
                >
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textSelectedSmallStyle: {
        fontSize: 10,
        fontFamily: 'Arial Rounded MT Bold',
        color: 'white',
        paddingHorizontal: 4,
    },
    textSelectedStyle: {
        fontSize: 18,
        fontFamily: 'Arial Rounded MT Bold',
        color: '#A8A8A8',
    },
    textUnselectedStyle: {
        fontSize: 18,
        fontFamily: 'Arial Rounded MT Bold',
        color: 'white',
    },
    tabSelectedSmallStyle: {
        height: 18,
        paddingHorizontal: 6,
        margin: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
    },
    tabSelectedStyle: {
        height: 30,
        paddingHorizontal: 12,
        margin: 7,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    tabUnselectedStyle: {
        height: 30,
        paddingHorizontal: 12,
        margin: 7,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    }
};

export default Tag;
