<template>
  <div class="authorization">
    <div class="authorization__form-wrapper">
      <h1 class="authorization__logo">[nim]</h1>
      <form class="authorization__form form" novalidate>
        <input class="form__login" type="text" name="login" placeholder="login" spellcheck="false">
        <input class="form__email" type="email" name="email" placeholder="email" spellcheck="false">
        <input class="form__password" type="password" name="password" placeholder="password" spellcheck="false">
        <input class="form__password" type="password" name="password-repeat" placeholder="repeat password" spellcheck="false">
        <div class="form__message"></div>
        <div class="form__actions">
          <button class="form__submit" type="submit" @click="completeSignUp()">SIGN UP</button>
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
      repeatPassword: ''
    }
  },
  methods:{
    ...mapActions(['signUp']),
    ...mapMutations(['setCurrentComponent']),
    completeSignUp(){
      /*if(!this.isPasswordMatch()){
        //create message
        return;
      }*/
      this.signUp();
    },
    isPasswordMatch(){
      return this.credentials.password === this.repeatPassword
    }
  }
}
</script>

<style scoped>

</style>