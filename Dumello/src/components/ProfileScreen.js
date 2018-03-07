import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import ProfilePhoto from './common/ProfilePhoto';
import Header from './common/Header';
import TabBar from './common/TabBar';

import { Card, Button, StarRating } from './common';

class ProfileScreen extends Component {
    render() {
        const {
            bestJokeText,
            playButton,
            followButtonText,
            followButton,
            nameText,
            followerText,
            reviewText,
            followerReviewView,
            cardStyles } = styles;

        const { name, imageUrl, followers, likes } = this.props;

        //only for moment
        const vFollowers = followers ? followers : 0;
        const vLikes = likes ? likes : 0;

        return (
            <View style={styles.mainStyle}>
                <Header />

                <Card
                    style={{
                        backgroundColor: '#fff',
                        marginHorizontal: 32,
                        marginTop: 80,
                        marginBottom: 120,
                        flex: 1,
                        alignSelf: 'stretch'
                    }}
                >
                    <ProfilePhoto imgUrl={imageUrl} />
                    <Text style={nameText}>{name}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={followerText}>{vFollowers} Urmaritori</Text>
                        <Text style={reviewText}>{vLikes} Aprecieri</Text>
                    </View>

                    <StarRating coloured="4" />
                    <Button style={followButton}>
                        <Text style={followButtonText}>Urmareste</Text>
                    </Button>

                </Card>

                <TabBar />
            </View>
        );
    }
}

const styles = {

    mainStyle: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        elevation: 1,
        backgroundColor: '#E9E9EF',
    },

    nameText: {
        marginTop: 5,
        height: 24,
        alignSelf: 'center',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 20,
        color: '#4A4A4A'
    },
    followerText: {
        height: 16,
        marginTop: 23,
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
        color: '#4A4A4A',
        backgroundColor: 'transparent'
    },
    reviewText: {
        color: '#9B9B9B',
        height: 16,
        marginTop: 23,
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    followButton: {
        marginTop: 33,
        backgroundColor: '#FFBE1A',
        borderColor: '#FFBE1A',
        height: 40,
        width: 200,
        borderRadius: 100,
        alignSelf: 'center',
    },
    followButtonText: {
        color: '#fff',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 17,
    },
    playButton: {
        borderRadius: 100,
        backgroundColor: '#FF8133',
        height: 27,
        width: 65,
        borderColor: '#FF8133',
        marginTop: 30,
        marginLeft: 15,
        alignSelf: 'center'
    },
    bestJokeText: {
        color: '#393939',
        fontSize: 14,
        fontFamily: 'Arial Rounded MT Bold',
        height: 16,
        width: 200,
        marginLeft: 10,
        textAlign: 'center',
        marginTop: 15
    },
};

const mapStateToProps = ({ profile }) => {
    console.log('profile', profile);
    if (profile) {
        const { name, imageUrl, followers, likes } = profile;
        return { name, imageUrl, followers, likes };
    } else {
        return {};
    }
};

export default connect(mapStateToProps, {})(ProfileScreen);

