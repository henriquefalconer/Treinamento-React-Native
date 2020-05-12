import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FeedHeader from "../../../components/SocialMedia/General/FeedHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function ProfileTab({navigation}) {
    return (
        <SafeAreaView style={styles.background} >
            <FeedHeader navigation={navigation} />
            <ImageBackground style={styles.background} source={require('../../../../assets/back-profile.png')}>
                <View style={{justifyContent: 'flex-start'}}>
                    <View style={styles.profileImage}>
                        <Image style={{borderRadius: 200}} source={require('../../../../assets/avatars/Cleber.jpg')}></Image>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.infoContainer}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cleber Cunha</Text>
                        <Text style={{fontSize: 15, fontWeight: 'normal'}}>@cleber.cunha</Text>
                    </View>
                    {/* <View style={styles.ProfileButton}>
                        <TouchableOpacity>
                            <Text style={styles.EditProfileText}>Editar Perfil</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.BiggerEditProfileButton}>
                        <View style={styles.EditProfileButton}>
                            <TouchableOpacity>
                                <Text style={styles.EditProfileText}>Editar Perfil</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.Bio}>
                    <Text>bio legal bio legal bio legal bio legal bio legal bio legal bio legal bio legal bio legal.</Text>
                </View>
                <View style={styles.BoxesNavigation}>
                    <View style={styles.SelectionBox}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pius</Text>  
                        <Text style={styles.RedLine}></Text>
                    </View>
                    <View style={[styles.SelectionBox, {marginTop: -22}]}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pius</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>e Respostas</Text>  
                        <Text style={[styles.RedLine, {backgroundColor: '#999999', marginTop: 6}]}></Text>
                    </View>
                    <View style={styles.SelectionBox}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Curtidas</Text>  
                        <Text style={[styles.RedLine, {backgroundColor: '#999999'}]}></Text>
                    </View>
                </View>
            </ImageBackground>
            <PiarButton navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginTop: 110,
        marginLeft: 20,
    },
    infoContainer: {
        marginLeft: 25,
        marginTop: -70,
    },
    Bio: {
        width: 332, 
        height: 73,
        marginTop: 10,
        marginLeft: 20,
    },
    BoxesNavigation: {
        marginLeft: 2,
        flexDirection: "row",
        alignSelf: "center",
    },
    SelectionBox: {
        alignItems: "center",
        flex: 1,
    },
    RedLine: {
        marginTop: 5,
        width: 114,
        height: 2,
        backgroundColor: '#F21D1D',
    },
    BiggerEditProfileButton: {
        width: 128,
        height: 40,
        backgroundColor: '#F21D1D', 
        borderRadius: 40,
        marginTop: -65,
        marginLeft: 90,
    },
    EditProfileButton: {
        width: 120,
        height: 32,
        backgroundColor: '#ffffff', 
        borderRadius: 40,
        marginTop: 4,
        marginLeft: 4,
    },
    ProfileButton: {
        width: 138,
        height: 32,
        backgroundColor: '#F21D1D', 
        borderRadius: 40,
        marginTop: -60,
        marginLeft: 80,
    },
    EditProfileText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
    },
});

export default ProfileTab;