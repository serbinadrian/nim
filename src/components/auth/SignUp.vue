<template>
  <div class="authorization">
    <div class="authorization__form-wrapper">
      <h1 class="authorization__logo">[nim]</h1>
      <form class="authorization__form form" novalidate>
        <input @input="loginValidation"
               :class="{'not-validated' : !validationStatus.login}"
               class="form__login"
               type="text"
               name="login"
               placeholder="login"
               spellcheck="false"
               v-model="credentials.login">
        <input @input="emailValidation"
               :class="{'not-validated' : !validationStatus.email}"
               class="form__email"
               type="email"
               name="email"
               placeholder="email"
               spellcheck="false"
               v-model="credentials.email">
        <input @input="passwordValidation"
               :class="{'not-validated' : !validationStatus.password}"
               class="form__password"
               type="password"
               name="password"
               placeholder="password"
               spellcheck="false"
               v-model="credentials.password">
        <input @input="passwordValidation"
               :class="{'not-validated' : !validationStatus.password}"
               class="form__password"
               type="password"
               name="password-repeat"
               placeholder="repeat password"
               spellcheck="false"
               v-model="repeatPassword">
        <div class="form__message"></div>
        <div class="form__actions">
          <button :disabled="isEmpty"
                  class="form__submit"
                  type="submit"
                  @click="completeSignUp(credentials)">SIGN UP</button>
          <div class="form__signup-text">or <span @click="setCurrentComponent('SignIn')" class="form__signup-link">sign In</span></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
export default {
  name: "SignUp",
  data(){
    return{
      credentials: {
        login: '',
        email: '',
        password: ''
      },
      repeatPassword: '',
      validationStatus: {
        login: false,
        email: false,
        password: false
      }
    }
  },
  computed: {
    isEmpty(){
      return this.credentials.login === '' || this.credentials.password === '' || this.credentials.email === '' || this.repeatPassword === '';
    },
  },
  methods:{
    ...mapActions(['signUp']),
    ...mapMutations(['setCurrentComponent']),
    completeSignUp(){
      this.signUp();
    },
    loginValidation() {
      this.validationStatus.login = true;
    },
    passwordValidation() {
      this.validationStatus.password = this.credentials.password === this.repeatPassword;
    },
    emailValidation() {
      //TODO fix
      //const regExpForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      //this.validationStatus.email = regExpForEmail.test(this.credentials.email);
      this.validationStatus.email = true;
    },
  }
}
</script>

<style scoped>
.not-validated, .weak{
  border: 1px solid darkred;
  box-shadow: 0 0 3px darkred;
}
</style>