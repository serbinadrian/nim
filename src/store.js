import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as matrixSDK from "matrix-js-sdk";
//import language from './data/lang/language_en.json'
import errCodes from './data/status/errCodes.json'
import components from './data/components/components.json'
import dealStatus from './data/status/dealStatus.json'
import modals from './data/components/modals.json'
import themes from './data/theme/themes.json'

Vue.use(Vuex)


const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['currentUser', 'selectedTheme', 'selectedLanguage']
    })],
    state: {
        /*data*/
        errCodes: errCodes,
        components: components,
        dealStatus: dealStatus,
        modals: modals,
        themes: themes,

        /*net props*/
        backendUrl: 'http://bonch-ikt.ru:12881',
        matrixURL: 'http://bonch-ikt.ru:12808',

        /*Auth props*/
        currentUser: {
            username: '',
            accessToken: '',
            refreshToken: '',
            matrixAccessToken: '',
            matrixUserId: '',
            wallet: '',
            balance: ''
        },
        matrixClient: {},

        /*App props*/
        selectedTheme: themes.LIGHT,
        selectedLanguage: '',
        languageData: {},
        currentComponent: '',
        displayModalAs: modals.HIDDEN,

        /*Transfer Object*/
        roomMate: ''
    },
    getters: {
        isSignedIn(state) {
            //return Object.values(state.currentUser).every(val => val !== '');
            return state.currentUser.accessToken !== '';
        }
    },
    mutations: {
        setRoomMate(state, mate) {
            state.roomMate = mate;
        },
        setCurrentComponent(state, component) {
            state.currentComponent = component;
        },
        setUsername(state, username) {
            state.currentUser.username = username;
        },
        setCurrentUser(state, newCurrentUser) {
            state.currentUser.accessToken = newCurrentUser.accessToken ?? '';
            state.currentUser.refreshToken = newCurrentUser.refreshToken ?? '';
            state.currentUser.matrixAccessToken = newCurrentUser.matrixAccessToken ?? '';
            state.currentUser.matrixUserId = newCurrentUser.matrixUserId ?? '';
        },
        setWalletData(state, walletData) {
            state.currentUser.wallet = walletData.address ?? '';
            state.currentUser.balance = walletData.balance ?? '';
        },
        setMatrixClient(state, newMatrixClient) {
            state.matrixClient = newMatrixClient;
        },
        setSelectedLanguage(state, language) {
            state.selectedLanguage = language;
        },
        setLanguageData(state, languageData) {
            state.languageData = languageData;
        },
        setDisplayModalAs(state, modal) {
            state.displayModalAs = modal;
        },
        setSelectedTheme(state, theme) {
            state.selectedTheme = theme;
        }
    },
    actions: {
        /*Global*/
        defineCurrentComponent({commit, getters}) {
            commit('setCurrentComponent', getters.isSignedIn ? components.MESSAGES : components.SIGN_IN);
        },

        defineLanguageData({state, commit}, languageToSet) {
            if (state.selectedLanguage === '')
                commit('setSelectedLanguage', 'ru');
            else if (languageToSet)
                commit('setSelectedLanguage', languageToSet);

            import(`./data/lang/language_${state.selectedLanguage}.json`)
                .then(language => {
                    commit('setLanguageData', language);
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },

        /*Matrix CLient*/
        defineMatrixClient({commit, state}) {
            commit('setMatrixClient', matrixSDK.createClient({
                baseUrl: state.matrixURL,
                accessToken: state.currentUser.matrixAccessToken,
                userId: state.currentUser.matrixUserId
            }));

            // state.matrixClient.startClient()
            //     .then(() => {
            //         state.matrixClient.on("sync", function(matrixState) {
            //             switch (matrixState) {
            //               case "ERROR":
            //                 // update UI to say "Connection Lost"
            //                 break;
            //               case "SYNCING":
            //                 // update UI to remove any "Connection Lost" message
            //                 break;
            //               case "PREPARED":
            //                 // the client instance is ready to be queried.
            //                 // eslint-disable-next-line no-console
            //                 console.log(state.matrixClient.getRooms());
            //                 break;
            //             }
            //         });
            //
        }
    }
});

export default store;
