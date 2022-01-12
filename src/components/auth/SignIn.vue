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
               v-model="username">
        <input :disabled="waitingForResponse"
               :class="{'not-validated' : !isPasswordValid}"
               class="form__password"
               type="password"
               placeholder="password"
               spellcheck="false"
               v-model="password">
        <div class="form__message">{{ errorMessage }}</div>
        <div class="form__actions">
          <button :disabled="isEmpty || waitingForResponse"
                  class="form__submit"
                  type="submit"
                  @click.prevent="signIn({ username, password })">SIGN IN</button>
          <div class="form__signup-text">or <button type="button" :disabled="waitingForResponse" @click="setCurrentComponent(components.SIGN_UP)" class="form__signup-link">sign up</button></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "SignIn",
  data(){
    return{
      username: '',
      password: '',
      errorMessage: '',
      waitingForResponse: false
    }
  },
  computed: {
    ...mapState(['backendUrl', 'errCodes', 'components']),
    isUsernameValid() {
      return true;
    },
    isPasswordValid() {
      return true;
    },
    isEmpty(){
      return this.username === '' || this.password === '';
    },
  },
  methods:{
    ...mapMutations(['setCurrentComponent', 'setCurrentUser']),
    signIn(credentials){
      this.waitingForResponse = true;
      this.errorMessage = '';
      fetch(this.backendUrl + `/api/v1/user/auth`, {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      .then(response => {
        this.waitingForResponse = false;
        if (response.status === 200) {
          response.json().then(data => {
            this.setCurrentComponent(this.components.MESSAGES);
            this.setCurrentUser(data);
          });
        } else if (response.status === 400) {
          this.errorMessage =  'Ошибка 400: Неверный пароль';
        } else if (response.status === this.errCodes.NOT_FOUND) {
          this.errorMessage = 'Пользователь не найден';
        } else {
          this.errorMessage = 'Произошла ошибка, попробуйте позже';
        }
      })
      .catch(error => {
        this.waitingForResponse = false;
        // eslint-disable-next-line no-console
        console.log(error);
        this.errorMessage = 'Ошибка 503: Сервер недоступен';
      });
    }
  }
}
</script>

<style scoped>
  .not-validated, .weak{
    outline: 3px solid brown;
  }
</style>