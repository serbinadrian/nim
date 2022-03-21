<template>
  <div class="authorization__form-wrapper">
    <h1 class="authorization__logo">[nim]</h1>
    <form class="authorization__form form" method="POST" novalidate>
      <input :disabled="waitingForResponse"
              :class="{'not-validated' : !isUsernameValid}"
              class="form__login input"
              type="text"
              :placeholder="language['login']"
              spellcheck="false"
              v-model="username">
      <input :disabled="waitingForResponse"
              :class="{'not-validated' : !isPasswordValid}"
              class="form__password input"
              type="password"
              :placeholder="language['password']"
              spellcheck="false"
              v-model="password">
      <div class="form__message">{{ errorMessage }}</div>
      <div class="form__actions">
        <button :disabled="isEmpty || waitingForResponse"
                class="form__submit button"
                type="submit"
                @click.prevent="signIn({ username, password })">
                {{ language['sign in'] }}
        </button>
        <div class="form__signup-text">{{ language['or'] }}
          <button type="button" :disabled="waitingForResponse"
                  @click="$emit('current-authorization-window-selected', 'SignUp')"
                  class="form__signup-link">
                  {{ language['sign up'] }}
          </button></div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

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
    ...mapState(['backendUrl', 'errCodes', 'components', 'languageData']),
    language() {
      return this.languageData[this.components.AUTHORIZATION] || {};
    },
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
    ...mapMutations(['setCurrentComponent', 'setCurrentUser', 'setUsername']),
    ...mapActions(['defineMatrixClient']),
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
            this.setUsername(credentials.username);
            this.setCurrentComponent(this.components.MESSAGES);
            this.setCurrentUser(data);
            this.defineMatrixClient();
          });
        } else if (response.status === this.errCodes.BAD_REQUEST) {
          this.errorMessage =  'Неверный пароль';
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
 
</style>