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
        <input @input="passwordValidation"
               :class="{'not-validated' : !validationStatus.password}"
               class="form__password"
               type="password"
               name="password"
               placeholder="password"
               spellcheck="false"
               v-model="credentials.password">
        <div class="form__message"></div>
        <div class="form__actions">
          <button :disabled="isEmpty"
                  class="form__submit"
                  type="submit"
                  @click="signIn(credentials)">SIGN IN</button>
          <div class="form__signup-text">or <span @click="setCurrentComponent('SignUp')" class="form__signup-link">sign up</span></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "SignIn",
  data(){
    return{
      credentials: {
        login: '',
        password: ''
      },
      validationStatus: {
        login: true,
        password: true
      }
    }
  },
  computed: {
    isEmpty(){
      return this.credentials.login === '' || this.credentials.password === '';
    },
  },
  methods:{
    ...mapActions(['signIn']),
    ...mapMutations(['setCurrentComponent']),
    loginValidation() {
      this.validationStatus.login = true;
    },
    passwordValidation() {
      this.validationStatus.password = true;
    }
  }
}
</script>

<style scoped>
  .not-validated, .weak{
    border: 1px solid darkred;
    box-shadow: 0 0 3px darkred;
  }
</style>