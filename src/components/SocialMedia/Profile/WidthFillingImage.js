import React from 'react';
import { View, Image } from 'react-native';

export default function WidthFillingImage({ source, height=200, resizeMode="cover" }) {
    return (
        <View style={{
            height,
            alignSelf: 'stretch',
        }}>
            <Image 
                style={{
                    height: undefined,
                    width: undefined,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: '#aaa',
                }} 
                resizeMode={resizeMode}
                source={source}
            />
        </View>
    );
}