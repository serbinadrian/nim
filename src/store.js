import Vue from 'vue'
import Vuex from 'vuex'
//import language from './data/lang/language_en.json'
import errCodes from './data/status/errCodes.json'
import components from './data/components/components.json'
import dealStatus from './data/status/dealStatus.json'

Vue.use(Vuex)


const store = new Vuex.Store({
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
        selectedLanguage: 'ru',
        currentComponent: components.SIGN_IN
    },
    getters: {
        isSignedIn(state) {
            return Object.values(state.currentUser).every(val => val !== '');
        },
        getLanguage: function (state, component) {
            let result;
            switch (state.selectedLanguage) {
                case "en":
                    import('./data/lang/language_en.json')
                        .then(language => {
                            result = language[component];
                        })
                        .catch(err => {
                            // eslint-disable-next-line no-console
                            console.log(err);
                        });
                    break;
                case "ru":
                    import('./data/lang/language_en.json')
                        .then(language => {
                            result = language[component];
                        })
                        .catch(err => {
                            // eslint-disable-next-line no-console
                            console.log(err);
                        });

            }
            return result;
        }
    },
    mutations: {
        setApplicationLanguage(state, language) {
            state.selectedLanguage = language;
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

        /*Messages*/

        /*Deals*/

        /*Tasks*/
    }
});

export default store;
