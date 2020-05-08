import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import FilledButton from "../../components/FilledButton";
import { TouchableOpacity, TextInput, ScrollView } from "react-native-gesture-handler";
import { baseDeDados, loggedInUser } from "../../utilities/baseDeDados";
import ExpandingTextInput from "../../components/General/AutoExpandingTextInput";

function PiarScreen({navigation}) {
    let [piuText, changePiuText] = useState("");

    return (
        <SafeAreaView style={styles.background}>
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 8,
                flexDirection: 'row',
                paddingHorizontal: 20,
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
            }} 
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text
                        style={{
                            fontWeight: '500',
                            fontSize: 16,
                            paddingVertical: 10,
                            paddingRight: 20,
                        }}
                    >
                        Cancelar
                    </Text>
                </TouchableOpacity>
                <FilledButton 
                    text="Piar" 
                    onPress={() => navigation.goBack()}
                    textStyle={{fontSize: 17, color: "#fff"}} 
                    width={100}
                    height={38} 
                />
            </View>

            <ScrollView>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                }}>
                    <Image  
                        source={
                            baseDeDados
                                .getDadosUsuarioFromUsername(loggedInUser)
                                .infoUsuario.avatar
                            } 
                        style={{
                            height: 50,
                            width: 50,
                            right: 4,
                        }}
                    />
                    <ExpandingTextInput 
                        placeholder="Em que você está pensando?"
                        value={piuText}
                        onChange={(newValue) => changePiuText(newValue)}
                        style={{
                            flex: 1,
                            fontSize: 18,
                            textAlignVertical: 'top',
                        }}
                        onSubmitEditing={(event) => this.textHandler( event.nativeEvent.text )}
                        autoCapitalize='none'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default PiarScreen;