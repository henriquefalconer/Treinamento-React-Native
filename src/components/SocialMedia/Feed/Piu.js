import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import IconWithBadge from "../General/IconWithBadge";

function Piu() {
    return (
        <View>
            <View>
                <View style={{
                    width: 50,
                    height: 100,
                }}
                >
                    <Image style={{
                            width: 50,
                            height: 50,
                        }} 
                        source={require("../../../../assets/avatars/Cleber.jpg")} />
                </View>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Cleber Cunha</Text>
                        <Text>@cleber.cunha</Text>
                        <Text>2.5 h</Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <View>
                <IconWithBadge name="ios-chatbubbles" size={14} color="#aaa" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default Piu;