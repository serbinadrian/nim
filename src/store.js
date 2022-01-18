import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as matrixSDK from "matrix-js-sdk";
//import language from './data/lang/language_en.json'
import errCodes from './data/status/errCodes.json'
import components from './data/components/components.json'
import dealStatus from './data/status/dealStatus.json'

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

        /*net props*/
        backendUrl: 'http://bonch-ikt.ru:12881',
        matrixURL: 'http://bonch-ikt.ru:12808',

        /*Auth props*/
        currentUser: {
            accessToken: '',
            refreshToken: '',
            matrixAccessToken: '',
            matrixUserId: ''
        },
        matrixUser: {},

        /*App props*/
        selectedLanguage: '',
        languageData: {},
        currentComponent: '',
        isModalDisplayed: true,

        /*Transfer Object*/
        transferObject: {
            executorAddress: '',
            customerAddress: '',
            name: '',
            deposit: '',
            deadline: '',
            description: ''
        }
    },
    getters: {
        isSignedIn(state) {
            return Object.values(state.currentUser).every(val => val !== '');
        }
    },
    mutations: {
        setCurrentComponent(state, component) {
            state.currentComponent = component;
        },
        setCurrentUser(state, newCurrentUser) {
            state.currentUser.accessToken = newCurrentUser.accessToken ?? '';
            state.currentUser.refreshToken = newCurrentUser.refreshToken ?? '';
            state.currentUser.matrixAccessToken = newCurrentUser.matrixAccessToken ?? '';
            state.currentUser.matrixUserId = newCurrentUser.matrixUserId ?? '';
        },
        setMatrixUser(state, newMatrixUser) {
            state.matrixUser = newMatrixUser;
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
        setTransferObject(state, transferObject) {
            Object.assign(state.transferObject, transferObject);
        }
    },
    actions: {
        /*Global*/
        defineCurrentComponent({ commit, getters }) {
            commit('setCurrentComponent', getters.isSignedIn ? components.MESSAGES : components.SIGN_IN);
        },

        defineMatrixUser({ commit, state }) {
            commit('setMatrixUser', matrixSDK.createClient(state.matrixURL));
        },

        defineLanguageData({ state, commit }, languageToSet) {
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
        
        /*Auth*/
        
        /*Messages*/

        /*Deals*/

        /*Tasks*/
    }
});

export default store;
