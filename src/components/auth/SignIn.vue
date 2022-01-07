<template>
  <div class="authorization">
    <div class="authorization__form-wrapper">
      <h1 class="authorization__logo">[nim]</h1>
      <form class="authorization__form form" novalidate>
        <input class="form__login" type="text" name="login" placeholder="login" spellcheck="false" v-model="credentials.login">
        <input class="form__password" type="password" name="password" placeholder="password" spellcheck="false" v-model="credentials.password">
        <div class="form__message"></div>
        <div class="form__actions">
          <button class="form__submit" type="submit" @click="signIn(credentials)">SIGN IN</button>
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
      }
    }
  },
  methods:{
    ...mapActions(['signIn']),
    ...mapMutations(['setCurrentComponent'])
  }
}
</script>

<style scoped>

</style>