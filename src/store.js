import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as matrixSDK from "matrix-js-sdk";
//import language from './data/lang/language_en.json'
import errCodes from './data/status/errCodes.json'
import components from './data/components/components.json'
import dealStatus from './data/status/dealStatus.json'
import modals from './data/components/modals.json'

Vue.use(Vuex)


const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['currentUser', 'selectedLanguage']
    })],
    state: {
        /*data*/
        errCodes: errCodes,
        components: components,
        dealStatus: dealStatus,
        modals: modals,

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
        selectedLanguage: '',
        languageData: {},
        currentComponent: '',
        isModalDisplayed: false,

        /*Transfer Object*/
        deals: {
            customer: [],
            executor: []
        },
        roomMate: ''
    },
    getters: {
        isSignedIn(state) {
            //return Object.values(state.currentUser).every(val => val !== '');
            return state.currentUser.accessToken !== '';
        }
    },
    mutations: {
        setRoomMate(state, mate){
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
        setMatrixClient(state, newMatrixClient) {
            state.matrixClient = newMatrixClient;
        },
        setSelectedLanguage(state, language) {
            state.selectedLanguage = language;
        },
        setLanguageData(state, languageData) {
            state.languageData = languageData;
        },
        setModalVisibility(state, visibility) {
            state.isModalDisplayed = visibility;
        },
        pushDeal(state, deal) {
            if(deal.nameTo === state.currentUser.username){
                let dealToPush = Object.assign({}, deal);
                state.deals.executor.push(dealToPush);
            }
            if(deal.nameFrom === state.currentUser.username){
                let dealToPush = Object.assign({}, deal);
                state.deals.customer.push(dealToPush);
            }
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
            //     });
        },

        /*Auth*/

        /*Wallet*/
        getWallet() {
            fetch(this.state.backendUrl + '/api/v1/wallet', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.state.currentUser.accessToken
                }
            })
                .then(response => {
                    response.json().then(data => {
                        this.state.currentUser.wallet = data.wallet;
                        this.state.currentUser.balance = data.balance;
                        // eslint-disable-next-line no-console
                        console.log("WALLET", this.state.currentUser);
                    });
                });
        },
        /*Deals*/
        getDeals() {
            fetch(this.state.backendUrl + '/api/v1/escrow/deals', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.state.currentUser.accessToken
                }
            })
            .then(response => {
                // eslint-disable-next-line no-console
                console.log(response)
            })
        },
        createDeal() {
            fetch(this.state.backendUrl + '/api/v1/escrow/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.state.currentUser.accessToken,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    executor: '0x6abb69b635e5db345c83A26d3Be396bb8230BBD9',
                    customer: '0x6abb69b635e5db345c83A26d3Be396bb8230BBD9',
                    name: 'test',
                    description: 'description',
                    deposit: '1',
                    deadline: '1674158806'
                })
            })
            .then(response => {
                // eslint-disable-next-line no-console
                console.log(response)
            })
        }
        /*Tasks*/
    }
});

export default store;
