import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
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

        /*App props*/
        selectedLanguage: '',
        languageData: {},
        currentComponent: ''
    },
    getters: {
        isSignedIn(state) {
            return Object.values(state.currentUser).every(val => val !== '');
        },
        getLanguageData(state) {
            return state.languageData;
        }
    },
    mutations: {
        setSelectedLanguage(state, language) {
            state.selectedLanguage = language;
        },
        setLanguageData(state, languageData) {
            state.languageData = languageData;
        },
        setCurrentComponent(state, component) {
            state.currentComponent = component;
        },
        setCurrentUser(state, newCurrentUser) {
            state.currentUser.accessToken = newCurrentUser.accessToken ?? '';
            state.currentUser.refreshToken = newCurrentUser.refreshToken ?? '';
            state.currentUser.matrixAccessToken = newCurrentUser.matrixAccessToken ?? '';
            state.currentUser.matrixUserId = newCurrentUser.matrixUserId ?? '';
        }
    },
    actions: {
        /*Auth*/
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

        defineCurrentComponent({ commit, getters }) {
            commit('setCurrentComponent', getters.isSignedIn ? components.MESSAGES : components.SIGN_IN);
        }

        /*Messages*/

        /*Deals*/

        /*Tasks*/
    }
});

export default store;
