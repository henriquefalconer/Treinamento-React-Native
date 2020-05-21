// ---------------------------
// BASE DE DADOS DO PIUPIUWER:
// ---------------------------

import * as GeneralFunctions from "./GeneralFunctions";
import { TipoDeFeed } from "./constants";
import getUserDataFromApi from "./getUserDataFromApi";
import getAllApiData from "./getAllApiData";
import sendLikeToApi from "./sendLikeToApi";
import AsyncStorage from "@react-native-community/async-storage";
import deletePiuAPI from "./deletePost";
import destacarPiuApi from "./destacarPiuApi";

export var loggedInUser = null;

export function setLoggedInUser(user) {
    AsyncStorage.setItem('loggedInUser', user);
    loggedInUser = user;
}

// Coloca pius na ordem de tempo:
function sortPius(piusIds){
    piusIds.sort((a, b) => GeneralFunctions.getTimeFromPiuId(b) - GeneralFunctions.getTimeFromPiuId(a));
}

export function signOut() {
    AsyncStorage.removeItem('loggedInUser');
    AsyncStorage.removeItem('token');
    lastDownloadedApiDatabase = null;
}

export class BaseDeDados {
    constructor(data) {
        this.data = data;
    }

    async togglePiuLike({piuId}) {
        const infoUsuario = this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario;

        sendLikeToApi({
            apiPiuId: GeneralFunctions.getApiPiuIdFromPiuId(piuId),
            apiUserId: infoUsuario.apiId,
        });

        const index = infoUsuario.likes.indexOf(piuId);
        // Se o like não existe, adicioná-lo:
        if (index == -1) {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.push(piuId);
        }
        // Caso contrário, retire-o:
        else {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.splice(index, 1);
        }
    }

    replyPiu({piuReplyId, navigation}) {
        // Navegar para a tela de piar:
        navigation.navigate('Piar', { piuReplyId });
    }

    async togglePiuDestaque({piuId}) {
        destacarPiuApi({
            apiUserId: this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.apiId,
            apiPiuId: GeneralFunctions.getApiPiuIdFromPiuId(piuId),
        });

        const index = this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.indexOf(piuId);

        // Se o piu não está destacado, destaque-o:
        if (index == -1) {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.push(piuId);
        }
        // Caso contrário tire ele do destaque:
        else {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.splice(index, 1);
        }
    }

    async togglePiuDelete({piuId}) {
        deletePiuAPI(GeneralFunctions.getApiPiuIdFromPiuId(piuId));
        
        const piusUsuario = this.getDadosUsuarioFromPiuId(piuId).pius;
        const index = piusUsuario.indexOf(this.getDadosPiuFromPiuId(piuId));

        if (index != -1) {
            piusUsuario.splice(index, 1);
        }
    }

    getDadosUsuarioFromUsername(username) {
        var correctUsuarioData = null;
        this.data.forEach(function(usuarioData){
            if (usuarioData.infoUsuario.username == username) {
                correctUsuarioData = usuarioData;
            }
        });

        return correctUsuarioData;
    }
    
    getInfoUsuarioFromPiuId(piuId) {
        var nomeUsuario = GeneralFunctions.getUserNameFromPiuId(piuId);
    
        var infoUsuario = null;
    
        this.data.forEach(function(dadosUsuario){
            if (dadosUsuario.infoUsuario.username == nomeUsuario) {
                infoUsuario = dadosUsuario.infoUsuario;
            }
        });
    
        return infoUsuario;
    }
    
    getDadosUsuarioFromPiuId(piuId) {
        var nomeUsuario = GeneralFunctions.getUserNameFromPiuId(piuId);
    
        var correctData = null;
    
        this.data.forEach(function(dadosUsuario){
            if (dadosUsuario.infoUsuario.username == nomeUsuario) {
                correctData = dadosUsuario;
            }
        });
    
        return correctData;
    }
    
    getDadosPiuFromPiuId(piuId) {
        var nomeUsuario = GeneralFunctions.getUserNameFromPiuId(piuId);

        var piuData = null;

        this.data.forEach(function(dadosUsuario){
            if (dadosUsuario.infoUsuario.username == nomeUsuario) {
                dadosUsuario.pius.forEach(function(piu){
                    if (piu.piuId == piuId) piuData = piu;
                });
            }
        });

        return piuData;
    }

    allPiuIdsExist(piuIds) {
        for (let piuId of piuIds) {
            if (this.getDadosPiuFromPiuId(piuId) == null) return false;
        }
        return true;
    }

    convertMessageApi(piuMessage) {
        if (!piuMessage.startsWith('(replyTo:') 
            || piuMessage.indexOf(') ') == -1 
        ) return [null, piuMessage];

        const apiPiuReplyId = piuMessage.split('(replyTo:')[1].split(')')[0];

        if (isNaN(apiPiuReplyId)) return [null, piuMessage];

        let piuReplyId = null;

        this.data.forEach(function(dadosUsuario){
            dadosUsuario.pius.forEach(function(piu){
                if (GeneralFunctions.getApiPiuIdFromPiuId(piu.piuId) == apiPiuReplyId) 
                    piuReplyId = piu.piuId;
            });
        });

        if (piuReplyId == null) {
            // console.log(`convertMessageApi: piuReply da mensagem "${piuMessage}" não existe. Provavelmente foi deletado`);
            piuReplyId = GeneralFunctions.createPiuId({
                apiId: 'deleted',
            });
        }

        return [piuReplyId, piuMessage.split(') ')[1]];
    }

    carregarRelacoesDePiuReply() {
        for (let usuario of baseDeDados.data) {
            for (let piu of usuario.pius) {
                const [piuReplyId, message] = this.convertMessageApi(piu.message);
                piu.message = message;
                piu.piuReplyId = piuReplyId;
            }
        }
    }

    converterDadosUsuarioApi(serverUserData) {
        let userData = null; 
        let allPius = [];

        serverUserData['pius'].forEach(function(piu){
            allPius.push(
                new Piu(
                    GeneralFunctions.createPiuId({
                        username: serverUserData['username'],
                        time: Date.parse(piu['horario']),
                        apiId: piu['id'],
                    }),
                    piu['texto'],
                    null,
                )
            );
        });

        let likes = [];

        if (lastDownloadedApiDatabase != null) {
            for (let apiDadosUsuario of lastDownloadedApiDatabase) {
                for (let piu of apiDadosUsuario['pius']) {
                    for (let likerData of piu['likers']) {
                        if (likerData['username'] == serverUserData['username']) {
                            likes.push(
                                GeneralFunctions.createPiuId({
                                    username: piu['usuario']['username'],
                                    time: Date.parse(piu['horario']),
                                    apiId: piu['id'],
                                })
                            );
                        }
                    }
                }
            }
        }

        let favoritados = [];

        if (lastDownloadedApiDatabase != null) {
            for (let apiDadosUsuario of lastDownloadedApiDatabase) {
                for (let piu of apiDadosUsuario['pius']) {
                    for (let userQueFavoritou of piu['favoritado_por']) {
                        if (userQueFavoritou['username'] == serverUserData['username']) {
                            favoritados.push(
                                GeneralFunctions.createPiuId({
                                    username: piu['usuario']['username'],
                                    time: Date.parse(piu['horario']),
                                    apiId: piu['id'],
                                })
                            );
                        }
                    }
                }
            }
        }

        let allSeguindo = [];

        serverUserData['seguindo'].forEach(function(usuario){
            allSeguindo.push(usuario['username']);
        });

        userData = new UsuarioData(
            new InfoUsuario(
                `${serverUserData['first_name']} ${serverUserData['last_name']}`,
                serverUserData['username'],
                {uri: serverUserData['foto']},
                require("../../assets/profileBackground/FundoPJ.jpg"),
                allSeguindo,
                likes,
                favoritados,
                Date.parse(Date()),
                serverUserData['sobre'],
                serverUserData['id'],
            ),
            allPius,
        );

        return userData;
    }

    compare(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }

    async carregarAllDataFromApi() {
        let baseDeDadosChange = false;

        const [allApiData, error] = 
            await getAllApiData({
                username: loggedInUser,
            });
            
        if (error == null) { 

            if (!this.compare(lastDownloadedApiDatabase, allApiData)) {

                // Salvar dados da API na variável global do arquivo:
                lastDownloadedApiDatabase = allApiData;

                for (let servidorUsuarioData of allApiData) {
                    const newUsuarioData = this.converterDadosUsuarioApi(servidorUsuarioData);
                    const previousUsuarioData = this.getDadosUsuarioFromUsername(newUsuarioData.infoUsuario.username);
        
                    const index = this.data.indexOf(previousUsuarioData);
    
                    if (index != -1) this.data.splice(index, 1);

                    this.data.push(newUsuarioData);

                    baseDeDadosChange = true;
                }

                this.carregarRelacoesDePiuReply();
            }

        } else {
            console.log(`ERRO em carregarAllDataFromApi: ${error}`);
        }
    
        return baseDeDadosChange;
    }

    async carregarOnlyContactsFromApi() {
        let baseDeDadosChange = false;

        const [serverUserData, error] = 
            await getUserDataFromApi({
                username: loggedInUser,
            });
        
        if (error == null) {

            allApiData.forEach(function(usuario){
                contatos.push(usuario['username']);
            });

            let servidorRequests = [];

            for (let username of [...contatos, loggedInUser]) {
                servidorRequests.push(this.converterDadosUsuarioApi(username));
            }

            const usuariosData = await Promise.all(servidorRequests);

            for (let servidorUsuarioData of usuariosData) {
                if (servidorUsuarioData != null) {
                    if (this.getDadosUsuarioFromUsername(servidorUsuarioData.infoUsuario.username) == null && servidorUsuarioData != null) {
                        this.data.push(servidorUsuarioData);
                        baseDeDadosChange = true;
                    }
                }
            }
        } else {
            console.log(`ERRO em carregarOnlyContactsFromApi: ${error}`);
        }
    
        return baseDeDadosChange;
    }

    async montarPiusList(tipoDeFeed, selectedUser) {

        var allPius = [];
 
        const thisBaseDeDados = this; 

        if (loggedInUser == null) {
            console.log('montarPiusList: Recuperando usuário logado do AsyncStorage.');
            loggedInUser = await AsyncStorage.getItem('loggedInUser');
        }

        if (!selectedUser) selectedUser = loggedInUser;

        const selectedUserData = this.getDadosUsuarioFromUsername(selectedUser);
        if (selectedUserData == null) {

            const change = await this.carregarAllDataFromApi();

            if (!change) {
                console.log('ERRO em montarPiusList: usuário logado não existe.');
                return null;
            }
        }
        
        switch (tipoDeFeed) {
            case TipoDeFeed.apenasPiusDoUsuario:
                selectedUserData.pius.forEach(function(piu){
                    allPius.push(piu.piuId);
                });
                break;
            
            case TipoDeFeed.piusERespostasDoUsuario:
                thisBaseDeDados.data.forEach(function(userData){

                    if (userData.infoUsuario.username == selectedUser) {
                        userData.pius.forEach(function(piu){
                            allPius.push(piu.piuId);
                        });
                    } else {
                        userData.pius.forEach(function(piu){
                            if (GeneralFunctions.getUserNameFromPiuId(piu.piuReplyId) == selectedUser) {
                                allPius.push(piu.piuId);
                            }
                        });
                    }

                });
                break;
             
            case TipoDeFeed.curtidasDoUsuario:
                selectedUserData.infoUsuario.likes.forEach(function(likePiuId){
                    allPius.push(likePiuId);
                });
                break;
             
            case TipoDeFeed.favoritadosDoUsuario:
                selectedUserData.infoUsuario.destacados.forEach(function(destacadoPiuId){
                    allPius.push(destacadoPiuId);
                });
                break;

            case TipoDeFeed.contatos:
                selectedUserData.pius.forEach(function(piu){
                    allPius.push(piu.piuId);
                });
                selectedUserData.infoUsuario.seguindo.forEach(function(usuario){
                    const contatoDados = thisBaseDeDados.getDadosUsuarioFromUsername(usuario);
                    if (usuario != selectedUser && contatoDados != null) {
                        contatoDados.pius.forEach(function(piu){
                            allPius.push(piu.piuId);
                        });
                    }
                });
                break;
        
            default:
                thisBaseDeDados.data.forEach(function(userData){
                    userData.pius.forEach(function(piu){
                        allPius.push(piu.piuId);
                    });
                });
                break;
        }

        sortPius(allPius);

        return allPius;
    }
}

export class UsuarioData {
    constructor(infoUsuario, pius) {
        this.infoUsuario = infoUsuario;
        this.pius = pius;
    }

    getSeguidores() {
        var seguidoresList = [];

        const thisUser = this;

        baseDeDados.data.forEach(function(usuarioData){
            if (usuarioData.infoUsuario.seguindo.includes(thisUser.infoUsuario.username)) {
                seguidoresList.push(usuarioData.infoUsuario.username);
            }
        });

        return seguidoresList;
    }
}

export class InfoUsuario {
    constructor(nome, username, avatar, 
        background, seguindo, 
        likes, destacados, conoscoDesde, 
        descricao, apiId) {
            this.nome = nome;
            this.username = username;
            this.avatar = avatar;
            this.background = background;
            this.seguindo = seguindo;
            this.likes = likes;
            this.destacados = destacados;
            this.conoscoDesde = conoscoDesde;
            this.descricao = descricao;
            this.apiId = apiId;
    }
}

export class Piu {
    constructor(piuId, message, piuReplyId) {
        this.piuId = piuId;
        this.message = message;
        this.piuReplyId = piuReplyId;
    }

    getLikes() {
        var likesList = [];

        var thisPiu = this;

        baseDeDados.data.forEach(function(usuarioData){
            if (usuarioData.infoUsuario.likes.includes(thisPiu.piuId)) likesList.push(usuarioData.infoUsuario.username);
        });
        
        return likesList;
    }

    getReplies() {
        var repliesList = [];

        var thisPiu = this;

        baseDeDados.data.forEach(function(usuarioData){
            var piusUsuario = usuarioData.pius;

            piusUsuario.forEach(function(piu){
                if (piu.piuReplyId == thisPiu.piuId) repliesList.push(usuarioData.infoUsuario.username);
            });
        });
 
        return repliesList;
    }

    hasDestaque() {
        const usuarioData = baseDeDados.getDadosUsuarioFromUsername(loggedInUser);
        return usuarioData == null ? false : usuarioData.infoUsuario.destacados.includes(this.piuId);
    }
}

var lastDownloadedApiDatabase = null;

export var baseDeDados = new BaseDeDados([
    new UsuarioData(
        new InfoUsuario(
            // Nome:
            "Fulano Beltrano",
            // Nome de usuário:
            "fulano.beltrano",
            // Arquivo de avatar:
            require("../../assets/avatars/Fulano.jpg"),
            // Arquivo de plano de fundo do perfil:
            require("../../assets/profileBackground/Praia.png"),
            // Seguindo:
            [
                "fulano.beltrano",
                "cleber.cunha",
                "rosi.plat",
                "richar.lison",
                "YeVictor",
                "Murilo_T",
                "Clau",
                "Jorel",
                "FabioBassoi",
                "Diegoo",
                "Mateeus",
                "MatiasH",
                "Ken?",
                "Enzo",
                "Gakio",
                "Magodosdoces",
                "MagaldiNarguileiro",
            ],
            // IDs dos pius que o usuário deu like:
            [
                GeneralFunctions.createPiuId({
                    username: "richar.lison",
                    time: Date.parse("15 Apr 2020 8:30:00"),
                }),
                GeneralFunctions.createPiuId({
                    username: "rosi.plat",
                    time: Date.parse("15 Apr 2020 7:00:00"),
                }),
            ],
            // Pius destacados:
            [],
            // Na plataforma desde:
            Date.parse("02 Feb 2020 7:00:00"),
            // Descrição de perfil:
            "Sou apenas um usuário da base de dados local! Se você me procurar, não vai me achar na API ;)",
        ),
        [
            new Piu(
                GeneralFunctions.createPiuId({
                    username: "fulano.beltrano",
                    time: Date.parse("15 Apr 2020 11:38:00"),
                }),
                "E pensar que tem caras por aí que só piam a quantidade de pius que eles já postaram... Eles parecem mal saber de todo o potencial que a plataforma PiuPiuwer tem!",
                GeneralFunctions.createPiuId({
                    username: "cleber.cunha",
                    time: Date.parse("15 Apr 2020 11:00:00"),
                }),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Cleber Cunha",
            "cleber.cunha",
            require("../../assets/avatars/Cleber.jpg"),
            require("../../assets/profileBackground/Porsche911.jpg"),
            [
                "fulano.beltrano",
                "rosi.plat",
                "richar.lison",
                "YeVictor",
                "Murilo_T",
                "Clau",
                "Jorel",
                "FabioBassoi",
                "Diegoo",
                "Mateeus",
                "MatiasH",
                "Ken?",
                "Enzo",
                "Gakio",
                "Magodosdoces",
                "MagaldiNarguileiro",
            ],
            [
                GeneralFunctions.createPiuId({
                    username: "fulano.beltrano",
                    time: Date.parse("15 Apr 2020 11:38:00"),
                }),
                GeneralFunctions.createPiuId({
                    username: "cleber.cunha",
                    time: Date.parse("15 Apr 2020 8:00:00"),
                }),
                GeneralFunctions.createPiuId({
                    username: "richar.lison",
                    time: Date.parse("15 Apr 2020 8:30:00"),
                }),
            ],
            [],
            Date.parse("30 Mar 2020 7:00:00"),
            "Sou apenas um usuário da base de dados local! Se você me procurar, não vai me achar na API ;)",
        ),
        [
            new Piu(
                GeneralFunctions.createPiuId({
                    username: "cleber.cunha",
                    time: Date.parse("15 Apr 2020 11:00:00"),
                }),
                "Este é meu 100º piu! Esperei bastante por este momento!",
                null,            
            ),
            new Piu(
                GeneralFunctions.createPiuId({
                    username: "cleber.cunha",
                    time: Date.parse("15 Apr 2020 8:00:00"),
                }),
                "Este é meu 99º piu! Isso é 1 a menos que 100!",
                null,      
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Richarlison Dos Santos Neves Querubim Machado dos Santos Neves",
            "richar.lison",
            require("../../assets/avatars/Richarlison.jpg"),
            require("../../assets/profileBackground/Palmeira.jpg"),
            [
                "fulano.beltrano",
                "cleber.cunha",
                "rosi.plat",
                "YeVictor",
                "Murilo_T",
                "Clau",
                "Jorel",
                "FabioBassoi",
                "Diegoo",
                "Mateeus",
                "MatiasH",
                "Ken?",
                "Enzo",
                "Gakio",
                "Magodosdoces",
                "MagaldiNarguileiro",
            ],
            [
                GeneralFunctions.createPiuId({
                    username: "cleber.cunha",
                    time: Date.parse("15 Apr 2020 8:00:00"),
                }),
                GeneralFunctions.createPiuId({
                    username: "richar.lison",
                    time: Date.parse("15 Apr 2020 8:30:00"),
                }),
                GeneralFunctions.createPiuId({
                    username: "rosi.plat",
                    time: Date.parse("15 Apr 2020 7:00:00"),
                }),
            ],
            [],
            Date.parse("01 Apr 2020 7:00:00"),
            "Sou apenas um usuário da base de dados local! Se você me procurar, não vai me achar na API ;)",
        ),
        [ 
            new Piu(
                GeneralFunctions.createPiuId({
                    username: "richar.lison",
                    time: Date.parse("18 Apr 2020 11:07:00"),
                }),
                "Concordo totalmente!",
                GeneralFunctions.createPiuId({
                    username: "fulano.beltrano",
                    time: Date.parse("15 Apr 2020 11:38:00"),
                }),
            ),
            new Piu(
                GeneralFunctions.createPiuId({
                    username: "richar.lison",
                    time: Date.parse("15 Apr 2020 8:30:00"),
                }),
                "Sim! Sem dúvidas, é a melhor rede social que existe.",
                GeneralFunctions.createPiuId({
                    username: "rosi.plat",
                    time: Date.parse("15 Apr 2020 7:00:00"),
                }),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Rosimary Platanos",
            "rosi.plat",
            require("../../assets/avatars/Rosimary.jpg"),
            require("../../assets/profileBackground/Cidade.jpg"),
            [
                "fulano.beltrano",
                "cleber.cunha",
                "richar.lison",
                "YeVictor",
                "Murilo_T",
                "Clau",
                "Jorel",
                "FabioBassoi",
                "Diegoo",
                "Mateeus",
                "MatiasH",
                "Ken?",
                "Enzo",
                "Gakio",
                "Magodosdoces",
                "MagaldiNarguileiro",
            ],
            [],
            [],
            Date.parse("15 Apr 2020 6:00:00"),
            "Sou apenas um usuário da base de dados local! Se você me procurar, não vai me achar na API ;)",
        ),
        [
            new Piu(
                GeneralFunctions.createPiuId({
                    username: "rosi.plat",
                    time: Date.parse("15 Apr 2020 7:00:00"),
                }),
                "Comecei a usar hoje! Parece ser bom esse PiuPiuwer.",
                null,
            ),
        ]
    ),
]);