import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import TagCloud from '../common/TagCloud/TagCloud';
import { Button } from '../common';
import * as actions from '../../actions';

class OnboardingSelectTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
          empty: props.selectedTags.length === 0,
        };
    }

    tagsSelected() {
        this.props.tagsSelected(this.props.selectedTags);
        this.props.selectedEntriesLoad(this.props.selectedTags);
        Actions.pop(); 
    }

    render() {
        let buttonText;
        if (this.state.empty) {
            buttonText = <Text style={styles.buttonTextStyle}>Vreau Toate Categoriile</Text>;
        } else {
            buttonText = <Text style={styles.buttonTextStyle}>Am Ales Destul</Text>;
        }

        return (
            <View 
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    alignSelf: 'stretch',
                }}
            >
                <Text 
                    style={{
                        paddingTop: 90,
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Arial Rounded MT Bold',
                        fontSize: 15,
                    }}    
                >
                    Care sunt categoriile tale preferate?
                </Text>
                
                <View 
                    style={{
                        paddingTop: 50,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        flex: 1,
                    }} 
                >
                    <TagCloud 
                        selectedTags={this.props.selectedTags}
                        onValueChanged={(selectedTags) => {
                            this.props.selectedTags = selectedTags;
                            console.log(selectedTags);
                            this.setState({ empty: selectedTags.length === 0 });  
                        }}
                    />
                </View>
                <View 
                    style={{
                        alignSelf: 'center',
                        paddingBottom: 50,
                    }}
                >
                    <Button 
                        style={styles.buttonStyle} 
                        onPress={this.tagsSelected.bind(this)}
                    >
                        {buttonText}
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = { 
    buttonStyle: {
        height: 40,
        width: 200,
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#fff',
    },
    buttonTextStyle: {
        color: '#4A4A4A',
        fontSize: 14,
        fontFamily: 'Arial Rounded MT Bold',
    },
};

const mapStateToProps = state => {
    return { selectedTags: state.tags };
};

export default connect(mapStateToProps, actions)(OnboardingSelectTags);
