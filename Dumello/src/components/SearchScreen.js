import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';

import Header from './common/Header';
import EntryCard from './common/EntryCard';
import { Icon, Card } from './common';
import * as actions from '../actions';

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'icons'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchList) {
            this.setState({ show: 'list' });
        } else {
            this.setState({ show: 'icons' });
        }
    }

    handleSearchTextInput(text) {
        console.log(text);
    }

    search(searchFlag) {
        switch (searchFlag) {
            case 'newest':
                this.props.searchNewest();
                this.setState({ show: 'loading' });
                break;
            case 'favorites':
                console.log(' cauta favoritele tale');
                break;
            case 'funniest':
                this.props.searchFunniest();
                this.setState({ show: 'loading' });
                break;
            case 'youFollow':
                console.log(' cauta cele de la cei pe care ii urmaresti');
                break;
            case 'mostShared':
                this.props.searchMostShared();
                this.setState({ show: 'loading' });
                break;
            case 'over18':
                console.log(' cauta cele peste 18 ani');
                break;
            default:
                break;
        }
    }

    keyExtractor(item) {
        return item.uid;
    }

    renderListItem({ item }) {
        return (
            <EntryCard
                entry={item}
            />
        );
    }

    renderSearchCard({ flag, picture, iconStyle, title }) {
        return (
            <TouchableOpacity
                style={{ flex: 0.5, padding: 10 }}
                onPress={() => this.search(flag)}
            >
                <Card
                    style={{
                        flexDirection: 'column',
                        elevation: 1,
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                    }}
                >
                    <Icon
                        source={picture}
                        style={iconStyle}
                        onPress={() => this.search(flag)}
                    />
                    <Text style={{ textAlign: 'center' }}>
                        {title}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    }

    renderListOrIcons() {
        switch (this.state.show) {
            case 'list':
                return (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.props.searchList}
                            renderItem={this.renderListItem.bind(this)}
                            keyExtractor={this.keyExtractor.bind(this)}
                            showsVerticalScrollIndicator={false}
                            style={{
                                flex: 1,
                                paddingBottom: 12,
                                marginBottom: 8,
                                marginTop: 8,
                            }}
                        />
                    </View>
                );
            case 'loading':
                return (
                    <View style={{ flex: 1 }} >
                        <DotIndicator color={'#393939'} size={5} />
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.45, flexDirection: 'row' }} >
                            {this.renderSearchCard({
                                flag: 'newest',
                                picture: require('../../resources/img/faceIcon/FaceIconNew.png'),
                                iconStyle: {
                                    height: 59,
                                    width: 73
                                },
                                title: 'Cele mai noi',
                            })}
                            {this.renderSearchCard({
                                flag: 'favorites',
                                picture: require('../../resources/img/faceIcon/FaceIconFavorites.png'),
                                iconStyle: {
                                    height: 58,
                                    width: 73
                                },
                                title: 'Favorite',
                            })}
                        </View>
                        <View style={{ flex: 0.45, flexDirection: 'row' }} >
                            {this.renderSearchCard({
                                flag: 'funniest',
                                picture: require('../../resources/img/faceIcon/FaceIconFunny.png'),
                                iconStyle: {
                                    height: 58,
                                    width: 66
                                },
                                title: 'Cele mai amuzante',
                            })}
                            {this.renderSearchCard({
                                flag: 'youFollow',
                                picture: require('../../resources/img/faceIcon/FaceIconFollowed.png'),
                                iconStyle: {
                                    height: 53,
                                    width: 60
                                },
                                title: 'De la cei pe care ii urmaresti',
                            })}
                        </View>
                        <View style={{ flex: 0.45, flexDirection: 'row' }} >
                            {this.renderSearchCard({
                                flag: 'mostShared',
                                picture: require('../../resources/img/faceIcon/FaceIconDistrib.png'),
                                iconStyle: {
                                    height: 60,
                                    width: 82
                                },
                                title: 'Cele mai distribuite',
                            })}
                            {this.renderSearchCard({
                                flag: 'over18',
                                picture: require('../../resources/img/faceIcon/FaceIcon18.png'),
                                iconStyle: {
                                    height: 58,
                                    width: 64
                                },
                                title: 'Peste 18 ani',
                            })}
                        </View>
                    </View>
                );
        }
    }

    renderSearchBar() {
        if (this.state.show === 'list') {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        this.setState({ show: 'icons' });
                        this.props.clearSearchList();
                    }}
                >
                    <Text
                        style={{
                            marginHorizontal: 10,
                            flex: 1,
                            color: '#393939',
                            fontFamily: 'Arial Rounded MT Bold',
                            fontSize: 13,
                        }}
                    >
                        Renunta
                    </Text>
                    <View
                        style={{
                            height: 38,
                            width: 42,
                            margin: 1,
                            borderRadius: 10,
                            backgroundColor: '#FF5454',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            source={require('../../resources/img/cancel/Cancel.png')}
                            style={{
                                height: 24,
                                width: 24,
                            }}
                            onPress={() => {
                                this.setState({ show: 'icons' });
                                this.props.clearSearchList();
                            }}
                        />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TextInput
                    style={{
                        marginHorizontal: 10,
                        flex: 1,
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Cauta"
                    placeholderTextColor="#9B9B9B"
                    autoCapitalize="none"
                    onChangeText={this.handleSearchTextInput.bind(this)}
                />
                <View
                    style={{
                        height: 38,
                        width: 42,
                        margin: 1,
                        borderRadius: 10,
                        backgroundColor: '#FFBE1A',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon
                        source={require('../../resources/img/searchWhite/SearchWhite.png')}
                        style={{
                            height: 24,
                            width: 24,
                        }}
                    />
                </View>
            </View>
        );
    }

    render() {
        return (
            <View
                style={styles.mainStyle}
            >
                <Header showBackButton />
                <View
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                    }}
                >
                    <View
                        style={{
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: '#FFFFFF',
                            shadowColor: '#000000',
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 1, height: 1, },
                            margin: 10,
                        }}
                    >
                        {this.renderSearchBar()}
                    </View>

                    <View style={styles.searchViewStyle}>
                        {this.renderListOrIcons()}
                    </View>
                </View>
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
    searchViewStyle: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        alignSelf: 'stretch',
    },
};

const mapStateToProps = state => {
    return {
        searchList: state.searchList,
    };
};

export default connect(mapStateToProps, actions)(SearchScreen);
