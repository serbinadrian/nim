<template>
  <div class="authorization">
    <div class="authorization__form-wrapper">
      <h1 class="authorization__logo">[nim]</h1>
      <form class="authorization__form form" method="POST" novalidate>
        <input :disabled="waitingForResponse"
               :class="{'not-validated' : !isUsernameValid}"
               class="form__login"
               type="text"
               placeholder="login"
               spellcheck="false"
               autocomplete="new-password"
               v-model="username">
        <input :disabled="waitingForResponse"
               :class="{'not-validated' : !isEmailValid}"
               class="form__email"
               type="email"
               placeholder="email"
               spellcheck="false"
               autocomplete="new-password"
               v-model="email">
        <input :disabled="waitingForResponse"
               :class="{'not-validated' : !isPasswordVaild}"
               class="form__password"
               type="password"
               placeholder="password"
               spellcheck="false"
               autocomplete="new-password"
               v-model="password">
        <input :disabled="waitingForResponse"
               :class="{'not-validated' : !isPasswordVaild}"
               class="form__password"
               type="password"
               placeholder="repeat password"
               spellcheck="false"
               autocomplete="new-password"
               v-model="repeatPassword">
        <div class="form__message">{{ errorMessage }}</div>
        <div class="form__actions">
          <button :disabled="!isSignUpAllowed || waitingForResponse"
                  class="form__submit"
                  type="submit"
                  @click.prevent="signUp({ username, email, password })">SIGN UP</button>
          <div class="form__signup-text">or <button type="button" :disabled="waitingForResponse" @click="setCurrentComponent('SignIn')" class="form__signup-link">sign In</button></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
export default {
  name: "SignUp",
  data(){
    return{
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      errorMessage: '',
      waitingForResponse: false
    }
  },
  computed: {
    ...mapState(['backendUrl', 'errCodes', 'components']),
    isEmpty(){
      return this.username === '' || this.password === '' || this.email === '' || this.repeatPassword === '';
    },
    isUsernameValid() {
      return true;
    },
    isEmailValid() {
      if (this.email.length === 0)
        return true;
      
      const regExpForEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      return regExpForEmail.test(this.email);
    },
    isPasswordVaild() {
      if (this.password.length === 0 && this.repeatPassword.length === 0)
        return true;
      
      return this.password === this.repeatPassword;
    },
    isSignUpAllowed() {
      return (
        !this.isEmpty && 
        this.isUsernameValid && 
        this.isEmailValid &&
        this.isPasswordVaild
      );
    }
  },
  methods:{
    ...mapMutations(['setCurrentComponent']),
    signUp(credentials){
      this.waitingForResponse = true;
      this.errorMessage = '';
      fetch(this.backendUrl + `/api/v1/user/`, {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      .then(response => {
        this.waitingForResponse = false;
        if (response.status === 200) {
          this.setCurrentComponent(this.components.SIGN_IN);
        }  else {
          // eslint-disable-next-line no-console
          console.log(response);
          this.errorMessage= 'Произошла ошибка, попробуйте позже';
        }
      })
      .catch(error => {
        this.waitingForResponse = false;
        // eslint-disable-next-line no-console
        console.log(error);
        this.errorMessage = 'Ошибка 503: Сервер недоступен';
      });
    },
  }
}
</script>

<style scoped>
.not-validated, .weak{
  outline: 3px solid brown;
}
</style>