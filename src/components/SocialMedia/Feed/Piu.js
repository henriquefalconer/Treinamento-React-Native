import React, { PureComponent } from "react";
import { View, Text, Image } from "react-native";
import PiuAction from "./PiuAction";
import PiuReply from "./PiuReply";
import { IconType, firstLastName } from '../../../utilities/constants';
import { baseDeDados, loggedInUser } from "../../../utilities/baseDeDados";
import { getRelativeTime, getTimeFromPiuId } from "../../../utilities/GeneralFunctions";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Piu extends PureComponent {

    constructor({ piuId, navigation, onChange, onPressUser }) {
        super();
        this.piuId = piuId;
        this.navigation = navigation;
        this.onChange = onChange;
        this.onPressUser = onPressUser;
    }

    montarPiuContent() {
        const infoUsuario = baseDeDados.getInfoUsuarioFromPiuId(this.piuId);
        const piuData = baseDeDados.getDadosPiuFromPiuId(this.piuId);

        if (infoUsuario == null || piuData == null) {
            return (
                <Text style={{
                    textAlign: 'center',
                    margin: 20,
                }}>
                    Houve um erro ao carregar o piu...
                </Text>
            );
        }

        return (
            <View>
                <View style={{flexDirection: 'row'}} >
                    <TouchableOpacity
                        onPress={() => this.onPressUser(infoUsuario.username)}
                    >
                        <View 
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: 22.5,
                                padding: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} 
                        >
                            <Image style={{
                                    width: 39,
                                    height: 39,
                                    borderRadius: 22.5,
                                    backgroundColor: "#ddd"
                                }} 
                                source={infoUsuario.avatar} />
                        </View>
                    </TouchableOpacity>
                    <View style={{
                            marginHorizontal: 10,
                            flex: 1,
                    }} >
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            marginTop: 10,
                            marginBottom: 2,
                        }} >
                            <TouchableOpacity
                                onPress={() => this.onPressUser(infoUsuario.username)}
                            >
                                <Text style={{
                                    marginRight: 6,
                                    fontWeight: "bold",
                                    fontSize: 15,
                                }} >{firstLastName(infoUsuario.nome)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.onPressUser(infoUsuario.username)}
                            >
                                <Text style={{
                                    color: "#8F8F8F",
                                    fontSize: 15,
                                    }} >@{infoUsuario.username}</Text>
                            </TouchableOpacity>
                            <View style={{
                                backgroundColor: "#C4C4C4", 
                                height: 5, 
                                width: 5, 
                                borderRadius: 2.5,
                                marginHorizontal: 8,
                            }} />
                            <Text style={{
                                color: "#8F8F8F",
                                fontSize: 15,
                            }} >{getRelativeTime(getTimeFromPiuId(this.piuId))}</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 15,
                            }} >{piuData.message}</Text>
                        </View>
                        {
                            piuData.piuReplyId != undefined 
                                && (
                                    <PiuReply 
                                        piuReplyId={piuData.piuReplyId} 
                                        onPressUser={this.onPressUser}
                                    />
                                )
                        }
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 0,
                    marginTop: 4,
                    paddingLeft: 50,
                    paddingRight: 55,
                }} >
                    <PiuAction 
                        iconType={IconType.Ionicons} 
                        icon="ios-heart" 
                        size={19} 
                        actionCount={piuData.getLikes().length} 
                        active={(piuData.getLikes()).includes(loggedInUser)}
                        onPress={async () => {
                            baseDeDados.togglePiuLike({ piuId: this.piuId });
                            await this.onChange();
                        }} 
                    />
                    <PiuAction 
                        iconType={IconType.Octicons} 
                        icon="reply" 
                        size={20} 
                        verticalIconDisplacement={2}
                        actionCount={piuData.getReplies().length} 
                        active={(piuData.getReplies()).includes(loggedInUser)}
                        onPress={async () => {
                            baseDeDados.replyPiu({ 
                                piuReplyId: this.piuId,
                                navigation: this.navigation,
                            });
                        }} 
                    />
                    <PiuAction 
                        iconType={IconType.MaterialCommunityIcons} 
                        icon="pin" 
                        size={20} 
                        active={piuData.hasDestaque()}
                        onPress={async () => {
                            baseDeDados.togglePiuDestaque({ piuId: this.piuId });
                            await this.onChange();
                        }} 
                    />
                    <View style={{
                        position: 'absolute',
                        right: 0,
                    }}>
                        {
                            infoUsuario.username == loggedInUser
                                ? <PiuAction 
                                    noMargin={true}
                                    iconType={IconType.Ionicons} 
                                    icon="md-trash" 
                                    size={22.5} 
                                    verticalIconDisplacement={-2.5}
                                    active={false}
                                    onPress={async () => {
                                        baseDeDados.togglePiuDelete({ piuId: this.piuId });
                                        await this.onChange();
                                    }} 
                                />
                                : null
                        }
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{padding: 8, backgroundColor: '#fff', marginBottom: 8}}>
                {this.montarPiuContent()}
            </View>
        );
    }

};