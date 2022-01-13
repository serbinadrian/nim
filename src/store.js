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
        /*getLanguage(state, component) {
            switch (component){
                case components.NAVBAR:
                    return language;
                    //break;
            }
        }*/
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
