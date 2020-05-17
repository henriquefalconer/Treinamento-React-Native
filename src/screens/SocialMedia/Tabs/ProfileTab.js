import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacityComponent } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { onChange } from "react-native-reanimated";
import { baseDeDados, loggedInUser } from "../../../utilities/baseDeDados";

//para mudanca de botao
function changeButton() {
    <TouchableOpacity style={{alignItems: 'center'}}>
        <View style={styles.SeguindoButton}>
            <TouchableOpacity>
                <Text style={styles.SeguindoText}>Seguindo</Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
}

function ProfileTab({navigation}) {
    // const [ShowButton, setShowButton] = useState(true);
    console.log(baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario)

    return (
        <SafeAreaView style={styles.background} >
            <SocialMediaHeader navigation={navigation} />
            <ImageBackground 
                style={{flex: 1, backgroundColor: "#fff"}} 
                source=
                    {
                        baseDeDados
                                .getDadosUsuarioFromUsername(loggedInUser) == null 
                                    ? null 
                                    : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.background
                    }
            >
                <View style={{justifyContent: 'flex-start'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image  
                            source={
                                baseDeDados
                                    .getDadosUsuarioFromUsername(loggedInUser) == null 
                                        ? null 
                                        : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.avatar
                            } 
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 200,
                                marginTop: 110,
                                marginLeft: 20,
                            }}
                        />
                        <View style={styles.InfoInteraction}>
                            <View styles={styles.SeguidoresInteraction}>
                                <Text style={{textAlign: 'center'}}>#</Text>
                                <Text style={styles.SeguidoresInteractionText}>Seguidores</Text>
                            </View>
                            <View styles={styles.SeguindoInteraction}>
                                <Text style={{textAlign: 'center'}}>
                                    { baseDeDados
                                        .getDadosUsuarioFromUsername(loggedInUser) == null 
                                            ? null 
                                            : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.seguindo.length
                                    }
                                </Text>
                                <Text style={styles.SeguindoInteractionText}>Seguindo</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.infoContainer}>
                        <Text 
                            style={{fontSize: 20, fontWeight: 'bold'}}
                        >
                            {
                            baseDeDados
                                .getDadosUsuarioFromUsername(loggedInUser) == null 
                                    ? null 
                                    : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.nome
                        }
                        </Text>
                        <Text style={{fontSize: 15, fontWeight: 'normal'}}>@
                        {
                            baseDeDados
                                .getDadosUsuarioFromUsername(loggedInUser) == null 
                                    ? null 
                                    : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.username
                        }
                        </Text>
                    </View>
                    {/* botoes editar perfil */}
                    <View style={{flexDirection: "column"}}>
                        {/* <View style={styles.BorderEditProfileButton}>
                            <View style={styles.EditProfileButton}>
                                <TouchableOpacity>
                                    <Text style={styles.EditProfileText}>Editar Perfil</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <TouchableOpacity
                            style={{
                                marginLeft: 30,
                                marginTop: 0,
                            }}
                            onPress= {() => changeButton()}
                        >
                            <View style={styles.BorderSeguirButton}>
                                <View style={styles.SeguirButton}>
                                    <TouchableOpacity>
                                        <Text style={styles.SeguirText}>Seguir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* {onPress ? 
                            <TouchableOpacity style={{alignItems: 'center'}}>
                                <View style={styles.SeguindoButton}>
                                    <TouchableOpacity>
                                        <Text style={styles.SeguindoText}>Seguindo</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        : null} */}
                    </View>
                </View>
                <View style={styles.Bio}>
                    <Text>
                    {
                        baseDeDados
                            .getDadosUsuarioFromUsername(loggedInUser) == null 
                                ? null 
                                : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.descricao
                    }
                    </Text>
                </View>
                <View style={styles.BoxesNavigation}>
                    <TouchableOpacity>
                        <View style={styles.SelectionBox}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pius</Text>  
                            <Text style={styles.RedLine}></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={styles.PiusERespostas}>Pius e Respostas</Text> 
                            <Text style={[styles.RedLine, {backgroundColor: '#999999'}]}></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Curtidas</Text>  
                            <Text style={[styles.RedLine, {backgroundColor: '#999999'}]}></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <PiarButton navigation={navigation} />
            <View>
            
            </View>
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
        marginTop: 10,
    },
    Bio: {
        width: 332, 
        height: 73,
        marginTop: 10,
        marginLeft: 20,
    },
    BoxesNavigation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    PiusERespostas: {
        fontSize: 15, 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    RedLine: {
        marginTop: 5,
        width: 130,
        height: 2,
        backgroundColor: '#F21D1D',
        alignItems: 'center',
    },
    BorderEditProfileButton: {
        width: 128,
        height: 40,
        backgroundColor: '#F21D1D', 
        borderRadius: 40,
        marginTop: -60,
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
    EditProfileText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
    },
    BorderSeguirButton: {
        width: 128,
        height: 40,
        backgroundColor: '#F21D1D', 
        borderRadius: 40,
        marginTop: 10,
        marginLeft: 90,
    },
    SeguirButton: {
        width: 120,
        height: 32,
        backgroundColor: '#ffffff', 
        borderRadius: 40,
        marginTop: 4,
        marginLeft: 4,
    },
    SeguirText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
    },
    SeguindoButton: {
        width: 125,
        height: 38,
        backgroundColor: '#F21D1D', 
        borderRadius: 40,
        marginTop: 10,
        marginLeft: 90,
        alignItems: 'center',
    },
    SeguindoText: {
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 6,
    },
    InfoInteraction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 0,
        marginTop: 160,
    },
    SeguidoresInteractionText: {
        textAlign: 'center',
        opacity: 0.7,
    },
    SeguindoInteractionText: {
        textAlign: 'center',
        opacity: 0.5,
    },
});

export default ProfileTab;