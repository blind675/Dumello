import React from 'react';
import { View, Image } from 'react-native';

const ProfilePhoto = ( {imgUrl} ) => {
    const { profileFotoView, profileFoto } = styles;

    function showPhoto(){
        if (imgUrl && imgUrl.replace(/\s/g,"") !== "") {
            return {uri: imgUrl}
        }else {
          return require('../../../resources/monkey.jpeg')
        }
    }

    return (
            <View style={profileFotoView}>
                <View style={profileFoto} />
                <View style={{
                    marginTop: -60,
                    marginLeft: -10,
                    height: 70,
                    width: 150,
                    backgroundColor: '#fff'
                }} />
                <Image style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center',
                    borderRadius: 60,
                    marginTop: -130
                }}
                       source={showPhoto()}
                />

            </View>
    );
};

const styles = {
    profileFotoView: {
        width: 130,
        height: 130,
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'column',
        borderRadius: 65,
        marginTop: -65,
        borderWidth: 0.1,
        borderRadius: 65,
        borderColor: '#A8A8A8',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    profileFoto: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        borderRadius: 60,
        marginTop: 5
    },
};

export default ProfilePhoto;
