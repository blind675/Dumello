import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { DotIndicator } from 'react-native-indicators';

import Header from './common/Header';
import TabBar from './common/TabBar';
import EntryCard from './common/EntryCard';
import TagCloud from './common/TagCloud/TagCloud';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth - 36;

class HomeScreen extends Component {

    showCaruselActivity() {
        if (this.props.newEntries.length !== 0) {
            return (<Carousel
                data={this.props.newEntries}
                renderItem={this.renderItem.bind(this)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum
                loop
                autoplay
                autoplayDelay={3000}
                autoplayInterval={10000}
                activeSlideAlignment={'start'}
                removeClippedSubviews={false}
            />);
        }

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: sliderWidth
                }}
            >
                <DotIndicator color={'#393939'} size={5} />
            </View>
        );
    }

    showEntriesList() {
        if (this.props.selectedEntries.length !== 0) {
            return (
                <FlatList
                    data={this.props.selectedEntries}
                    renderItem={this.renderListItem.bind(this)}
                    keyExtractor={this.keyExtractor.bind(this)}
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        paddingBottom: 72,
                        marginBottom: 51,
                        marginTop: 8,
                    }}
                />
            );
        }

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: sliderWidth
                }}
            >
                <DotIndicator color={'#393939'} size={5} />
            </View>
        );
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

    renderItem({ item }) {
        return (
            <EntryCard
                small
                entry={item}
            />
        );
    }

    render() {
        const { selectedTags } = this.props;
        return (
            <View style={styles.mainStyle}>
                <Header />
                <Text style={styles.infoTextStyle}>
                    Dumele noi
                </Text>
                <View
                    style={{
                        height: 130,
                        paddingTop: 2
                    }}
                >
                    {this.showCaruselActivity()}
                </View>
                <Text style={styles.infoTextStyle}>
                    Categoriile alese de tine
                </Text>
                <TouchableOpacity
                    onPress={() => Actions.tags()}
                >
                    <View
                        style={{
                            alignSelf: 'stretch',
                            paddingHorizontal: 8,
                        }}
                    >
                        <TagCloud
                            backgroundColor={'#A8A8A8'}
                            unselectable
                            tags={selectedTags.length === 0 ? ['Toate categoriile'] : selectedTags}
                            selectedTags={selectedTags.length === 0 ? ['Toate categoriile'] : selectedTags}
                        />
                    </View>
                </TouchableOpacity>
                {this.showEntriesList()}
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
    infoTextStyle: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        marginVertical: 8,
        marginHorizontal: 14,
        color: '#393939',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 12,
    }
};

const mapStateToProps = state => {
    return {
        selectedTags: state.tags,
        newEntries: state.newEntries,
        selectedEntries: state.selectedEntries,
    };
};

export default connect(mapStateToProps, null)(HomeScreen);
