import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import HollowTextField from "../components/HollowTextField";
import BlandHeader from "../components/BlandHeader";
import DatePicker from 'react-native-datepicker';
import { useState } from 'react';

function SignUpScreenNext({navigation}) {
    
    const [data, setdata] = useState('')
    return (
        <SafeAreaView style={styles.mainContainer}>
            <BlandHeader navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
                <View>
                    <DatePicker
                        style={styles.birthDate}
                        date={data} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="Data de nascimento"
                        format="DD-MM-YYYY"
                        minDate="01-01-1920"
                        maxDate="01-01-2019"
                        // confirmBtnText="Confirm"
                        // cancelBtnText="Cancel"
                        onDateChange={date => setdata(date)}
                    />
                    <HollowTextField placeholder="Senha"></HollowTextField>
                    <HollowTextField placeholder="Confirme sua senha"></HollowTextField>
                </View>

                <FilledButton width={170} height={47} textStyle={styles.smallButtonText} text="Continuar" onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 40,
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 30,
      color: '#F21D1D',
      textAlign: 'center',
    },
    smallButtonText: {
        fontSize: 20,
        color: "#FFF",
    },
    birthDate: {
        borderColor: "#aaa",
        borderWidth: 2,
        borderRadius: 30,
        paddingLeft: 20,
        height: 45,
        width: 310,
        marginVertical: 8,
    },
});

export default SignUpScreenNext;
