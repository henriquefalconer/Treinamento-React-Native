// ---------------------------
// BASE DE DADOS DO PIUPIUWER:
// ---------------------------

import * as GeneralFunctions from "./GeneralFunctions";
import { TipoDeFeed } from "./constants";
import getUserDataFromApi from "./getUserDataFromApi";

export var loggedInUser = 'Magodosdoces';

function sortPius(piusIds){
    piusIds.sort(function(a, b){return GeneralFunctions.getTimeFromPiuId(b) - GeneralFunctions.getTimeFromPiuId(a)});
    piusIds.sort(function(a, b){return baseDeDados.getDadosPiuFromPiuId(b).hasDestaque() - baseDeDados.getDadosPiuFromPiuId(a).hasDestaque()});
}

export class BaseDeDados {
    constructor(data) {
        this.data = data;
    }

    adicionarPiuABaseDeDados(mensagem, piuReplyId) {
        var currentTime = Date.parse(new Date());

        // Inserir piu a base de dados:
        this.getDadosUsuarioFromUsername(loggedInUser).pius.push(
            new Piu(
                loggedInUser + ":" + currentTime,
                mensagem,
                piuReplyId,
            ),
        );
    }

    togglePiuLike(piuId) {
        const index = this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.indexOf(piuId);
        // Se o like não existe, adicioná-lo:
        if (index == -1) {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.push(piuId);
        }
        // Caso contrário, retire-o:
        else {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.splice(index, 1);
        }
    }

    replyPiu(piuReplyId) {
        // Acionar popup de tela cheia:
        togglePopupWholeScreen("#popup_piar_reply");

        // Encontrar o popup de tela cheia:
        var popupBox = document.querySelector("#popup_piar_reply");

        // Montar o piu de reply:
        var piuReply = montarPiuReply(piuReplyId);

        // Inserir o piu de reply no popup:
        var popupPiarReplyPiu = popupBox.querySelector(".piu_reply_box");
        popupPiarReplyPiu.innerHTML = "";
        popupPiarReplyPiu.appendChild(piuReply);
    }

    togglePiuDestaque(piuId) {
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

    getDadosUsuarioFromUsername(username) {
        var correctUsuarioData = null;
        this.data.forEach(function(usuarioData){
            if (usuarioData.infoUsuario.username == username) correctUsuarioData = usuarioData;
        });

        return correctUsuarioData;
    }
    
    getDadosUsuarioFromPiuId(piuId) {
        var nomeUsuario = GeneralFunctions.getUserNameFromPiuId(piuId);
    
        var infoUsuario = null;
    
        this.data.forEach(function(dadosUsuario){
            if (dadosUsuario.infoUsuario.username == nomeUsuario) {
                infoUsuario = dadosUsuario.infoUsuario;
            }
        });
    
        return infoUsuario;
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

    async montarDadosUsuarioServidor(username) {
        const [serverUserData, error] = await getUserDataFromApi(username);

        if (error == null) {
            let allPius = [];

            serverUserData['pius'].forEach(function(piu){
                allPius.push(
                    new Piu(
                        `${serverUserData['username']}:${Date.parse(piu['horario'])}`,
                        piu['texto'],
                        null,
                    )
                );
            });

            let allSeguindo = [];

            serverUserData['seguindo'].forEach(function(usuario){
                allSeguindo.push(usuario['username']);
            });

            return new UsuarioData(
                new InfoUsuario(
                    `${serverUserData['first_name']} ${serverUserData['last_name']}`,
                    serverUserData['username'],
                    {uri: serverUserData['foto']},
                    "Porsche 911.jpg",
                    allSeguindo,
                    [
                        "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
                        "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                        "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                    ],
                    [],
                    Date.parse(Date()),
                    serverUserData['sobre'],
                ),
                allPius,
            )
        } else {
            console.log(`ERRO em montarDadosUsuarioServidor: ${error}`);
        }

        return null;
    }

    async carregarPiuServidor({onChangeLoadingProgress}) {
        let baseDeDadosChange = false;

        const [serverUserData, error] = await getUserDataFromApi(loggedInUser);
        
        if (error == null) {
            let contatos = [];

            serverUserData['seguindo'].forEach(function(usuario){
                contatos.push(usuario['username']);
            });

            let index = 1;

            for (let username of [...contatos, loggedInUser]) {
                onChangeLoadingProgress(index/[...contatos, loggedInUser].length);

                const usuarioServidorData = await this.montarDadosUsuarioServidor(username);
    
                if (this.getDadosUsuarioFromUsername(username) == null && usuarioServidorData != null) {
                    this.data.push(usuarioServidorData);
                    baseDeDadosChange = true;
                }

                index++;
            }
        } else {
            console.log(`ERRO em carregarPiuServidor: ${error}`);
        }
    
        return baseDeDadosChange;
    }

    montarPiusList(tipoDeFeed) {
        var allPius = [];

        const thisBaseDeDados = this;

        const loggedUserData = this.getDadosUsuarioFromUsername(loggedInUser);
        if (loggedUserData == null) {
            console.log('ERRO em montarPiusList: usuário logado não existe.');
            return null;
        }
        
        switch (tipoDeFeed) {
            case TipoDeFeed.apenasPiusDoUsuario:
                loggedUserData.pius.forEach(function(piu){
                    allPius.push(piu.piuId);
                });
                break;
            
            case TipoDeFeed.piusERespostasDoUsuario:
                thisBaseDeDados.data.forEach(function(userData){

                    if (userData.infoUsuario.username == loggedInUser) {
                        userData.pius.forEach(function(piu){
                            allPius.push(piu.piuId);
                        });
                    } else {
                        userData.pius.forEach(function(piu){
                            if (GeneralFunctions.getUserNameFromPiuId(piu.piuReplyId) == loggedInUser) {
                                allPius.push(piu.piuReplyId);
                            }
                        });
                    }

                });
                break;
             
            case TipoDeFeed.curtidasDoUsuario:
                loggedUserData.infoUsuario.likes.forEach(function(likePiuId){
                    allPius.push(likePiuId);
                });
                break;

            case TipoDeFeed.contatos:
                loggedUserData.pius.forEach(function(piu){
                    allPius.push(piu.piuId);
                });
                loggedUserData.infoUsuario.seguindo.forEach(function(usuario){
                    const contatoDados = thisBaseDeDados.getDadosUsuarioFromUsername(usuario);
                    if (usuario != loggedInUser && contatoDados != null) {
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
        descricao) {
            this.nome = nome;
            this.username = username;
            this.avatar = avatar;
            this.background = background;
            this.seguindo = seguindo;
            this.likes = likes;
            this.destacados = destacados;
            this.conoscoDesde = conoscoDesde;
            this.descricao = descricao;
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
            if (usuarioData.infoUsuario.likes.includes(thisPiu.piuId)) {
                likesList.push(usuarioData.infoUsuario.username);
            }
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
        return baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.includes(this.piuId);
    }
}

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
            "Pés%20na%20praia.png",
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
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ],
            // Pius destacados:
            [],
            // Na plataforma desde:
            Date.parse("02 Feb 2020 7:00:00"),
            // Descrição de perfil:
            "O primeiro de muitos usuários do PiuPiwer!",
        ),
        [
            new Piu(
                "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
                "E pensar que tem caras por aí que só piam a quantidade de pius que eles já postaram... Eles parecem mal saber de todo o potencial que a plataforma PiuPiuwer tem!",
                "cleber.cunha:" + Date.parse("15 Apr 2020 11:00:00"),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Cleber Cunha",
            "cleber.cunha",
            require("../../assets/avatars/Cleber.jpg"),
            "Porsche 911.jpg",
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
                "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
                "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
            ],
            [],
            Date.parse("30 Mar 2020 7:00:00"),
            "O segundo de muitos usuários do PiuPiwer!",
        ),
        [
            new Piu(
                "cleber.cunha:" + Date.parse("15 Apr 2020 11:00:00"),
                "Este é meu 100º piu! Esperei bastante por este momento!",
                null,            
            ),
            new Piu(
                "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                "Este é meu 99º piu! Isso é 1 a menos que 100!",
                null,      
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Richarlison Dos Santos Neves Querubim Machado",
            "richar.lison",
            require("../../assets/avatars/Richarlison.jpg"),
            "Palmeira.jpg",
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
                "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ],
            [],
            Date.parse("01 Apr 2020 7:00:00"),
            "O terceiro de muitos usuários do PiuPiwer!",
        ),
        [
            new Piu(
                "richar.lison:" + Date.parse("18 Apr 2020 11:07:00"),
                "Concordo totalmente!",
                "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
            ),
            new Piu(
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                "Sim! Sem dúvidas, é a melhor rede social que existe.",
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Rosimary Platanos",
            "rosi.plat",
            require("../../assets/avatars/Rosimary.jpg"),
            "Cidade.jpg",
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
            "Sou nova, não sei o que colocar aqui.",
        ),
        [
            new Piu(
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
                "Comecei a usar hoje! Parece ser bom esse PiuPiuwer.",
                null,
            ),
        ]
    ),
]);