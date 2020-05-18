import React, { useState } from "react";
import { View, Text, SafeAreaView, Keyboard } from "react-native";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import PiusSearchBar from "../../../components/SocialMedia/Search/PiusSearchBar";
import UserSearchCard from "../../../components/SocialMedia/Search/UserSearchCard"; 
import { FlatList } from "react-native-gesture-handler";
import { baseDeDados } from "../../../utilities/baseDeDados";
import { count } from "../../../utilities/constants";
import ProfileTab from "./ProfileTab";

function SearchContent({navigation, onPressUser}) {
    let [searchText, changeSearchText] = useState('');
    let [usersList, changeUsersList] = useState([]);
    let [flatListHeight, changeFlatListHeight] = useState(0);

    function searchUsers(searchTerm) {
        var allResults = [];

        if (searchTerm.length == 0) return allResults;
    
        var sortedUsuarioDatas = baseDeDados.data;
    
        sortedUsuarioDatas.sort((a,b) => a.infoUsuario.nome > b.infoUsuario.nome ? 1 : -1);
    
        sortedUsuarioDatas.forEach(function(usuarioData){
            if (count(usuarioData.infoUsuario.nome, searchTerm) > 0 || count(usuarioData.infoUsuario.username, searchTerm) > 0) {
                allResults.push(usuarioData.infoUsuario.username);
            }
        });
        
        return allResults;
    }

    function reloadSearchTab(newValue) {
        changeSearchText(newValue);

        const usersSearchList = searchUsers(newValue);

        changeUsersList(usersSearchList);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <SocialMediaHeader navigation={navigation} />
            <View style={{
                flex: 1, 
                backgroundColor: "#fff",
                alignItems: 'center',
            }}>
                <PiusSearchBar 
                    value={searchText}
                    onChange={reloadSearchTab} 
                    style={{
                        marginHorizontal: 10,
                    }}
                    onPressClear={() => {
                        reloadSearchTab('');
                    }}
                />
                <View
                    style={{
                        flex: 1, 
                        alignSelf: 'stretch',
                    }}
                    onLayout={(event) => {
                        changeFlatListHeight(event.nativeEvent.layout.height);
                    }}
                >
                    <FlatList
                        style={{
                            flex: 1, 
                            alignSelf: 'stretch',
                        }}
                        onScrollBeginDrag={() => {
                            Keyboard.dismiss();
                        }}
                        keyExtractor={(element) => {return element}}
                        data={usersList} 
                        renderItem={({ item }) => {
                            return (
                                <UserSearchCard 
                                    username={item}
                                    onPress={onPressUser}
                                />
                            );
                        }}
                        ListEmptyComponent={
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                height: flatListHeight,
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#666',
                                    textAlign: 'center',
                                }}>
                                    Tente buscar por pessoas no PiuPiuwer
                                </Text>
                            </View>
                        }
                    />
                </View>
            </View>
            <PiarButton navigation={navigation} />
        </SafeAreaView>
    );
};

export default function SearchTab(props) {
    let [selectedUsername, setSelectedUsername] = useState(null);

    return selectedUsername == null 
        ? <SearchContent 
            {...props} 
            onPressUser={setSelectedUsername} 
        /> 
        : <ProfileTab 
            {...props} 
            selectedUsername={selectedUsername} 
            onReturnFromSearch={() => setSelectedUsername(null)} 
        />
}