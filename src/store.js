import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /*Auth props*/
        isSignedIn: false,
        currentUser: {},
        token: '',
        /*App props*/
        currentComponent: 'SignIn'
    },
    mutations: {
        setCurrentComponent(state, component) {
            state.currentComponent = component;
        }
    },
    getters: {
    },
    actions: {
        signIn(){
            this.state.isSignedIn = true;
            this.state.currentComponent = "Messages";
            alert('sign in complete');
        },
        signUp(){
            alert('sign up complete');
        },
        signOut(){
            this.state.isSignedIn = false;
            this.state.currentComponent = "SignIn";
            alert('log out complete');
        }
    }
});

export default store;
