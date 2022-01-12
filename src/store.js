import Vue from 'vue'
import Vuex from 'vuex'
import components from './data/components/components.json'
import errCodes from './data/status/errCodes.json'
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
        isSignedIn: true,
        currentUser: {
            accessToken: '',
            refreshToken: '',
            matrixAccessToken: '',
            matrixUserId: ''
        },

        /*App props*/
        currentComponent: components.MESSAGES,

        /*User message*/
        userMessage: ''
    },
    mutations: {
        setCurrentComponent(state, component) {
            state.currentComponent = component;
        }
    },
    getters: {
        getErrCodes(state){
            return state.errCodes;
        },
        getComponents(state) {
            return state.components;
        },
        getDealStatus(state) {
            return state.dealStatus;
        }
    },
    actions: {
        /*Auth*/
        signIn(credentials){

            fetch(this.state.backendUrl + `/api/v1/user/auth`, {
                method: 'POST',
                body: JSON.stringify(credentials)
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(data => {
                            this.state.currentUser.accessToken = data.accessToken;
                            this.state.currentUser.refreshToken = data.refreshToken;
                            this.state.currentUser.matrixAccessToken = data.matrixAccessToken;
                            this.state.currentUser.matrixUserId = data.matrixUserId;
                        });
                    } else if (response.status === 400) {
                        this.state.userMessage =  'Ошибка 400: Неверный пароль';
                    } else if (response.status === errCodes.NOT_FOUND) {
                        this.state.userMessage = 'Пользователь не найден';
                    } else {
                        this.state.userMessage = 'Произошла ошибка, попробуйте позже';
                    }
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.state.userMessage = 'Ошибка 503: Сервер недоступен';
                });

            this.state.isSignedIn = true;
            this.state.currentComponent = "Messages";

            alert('sign in complete');
        },

        signUp(credentials){
            fetch(this.state.backendUrl + `/api/v1/user/`, {
                method: 'POST',
                body: JSON.stringify(credentials)
            })
                .then(response => {
                    if (response.status === 200) {
                        this.state.currentComponent = "SignIn";
                    }  else {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        this.state.userMessage = 'Произошла ошибка, попробуйте позже';
                    }
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.state.userMessage = 'Ошибка 503: Сервер недоступен';
                });

            alert('sign up complete');
        },

        signOut(){
            this.state.isSignedIn = false;
            this.state.currentUser.accessToken = '';
            this.state.currentUser.refreshToken = '';
            this.state.currentUser.matrixAccessToken = '';
            this.state.currentUser.matrixUserId = '';
            this.state.currentComponent = "SignIn";
            alert('log out complete');
        }
        /*Messages*/

        /*Deals*/

        /*Tasks*/
    }
});

export default store;
