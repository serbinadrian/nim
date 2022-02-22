<template>
  <div @click.stop class="create-room-modal" id="application-blank">
    <div class="create-room-modal__title">Start single chat with: </div>
    <div class="create-room-modal__field">
      <svg class="icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 12.5C6.6625 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.3375 12.5 10 12.5Z"/>
      </svg>
      <input 
        :disabled="waitingForResponse" 
        @keydown.enter.prevent="createSingle" 
        v-model="username" 
        class="create-room-modal__input input" 
        placeholder="@example" 
        spellcheck="false"
        type="text">
    </div>
    <button 
      :disabled="!username || waitingForResponse" 
      @click="createSingle" 
      class="create-room-modal__button button" 
      type="button">
        Start
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "CreateChat",
  data() {
    return {
      username: '',
      waitingForResponse: false
    };
  },
  computed: {
    ...mapState(['currentUser', 'matrixClient']),
    language() {
      return this.languageData[this.components.MESSAGES] || {};
    },
    userToInvite() {
      const servername = this.currentUser.matrixUserId.slice(this.currentUser.matrixUserId.indexOf(':'));
      const username = this.username[0] === '@' ? this.username : `@${this.username}`;
      return username + servername;
    }
  },
  methods: {
    createSingle() {
      this.waitingForResponse = true;
      this.matrixClient.createRoom({
        visibility: 'private',
        invite: [this.userToInvite]
      })
        .then(() => {
          this.waitingForResponse = false;
          this.username = '';
          this.$emit('close');
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.waitingForResponse = false;
        });
    }
  }
}
</script>

<style scoped>
  .create-room-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px 30px;
    background-color: var(--primary-color);
    border-radius: 30px;
  }

  .create-room-modal__title {
    font-size: 2.4rem;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 2rem;
    color: var(--secondary-font-color);
  }

  .create-room-modal__field {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .create-room-modal__input {
    flex: 1;
    border: none;
    font-size: 1.6rem;
    line-height: 1;
    padding: .75em 1.2em;
    border-radius: 100px;
  }

  .create-room-modal__button {
    display: block;
    margin: 2rem auto 0;
    min-width: 10rem;
    background-color: var(--primary-button-color);
    color: var(--primary-button-font-color);
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1;
    padding: .5em 1.2em;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    outline: none;
  }
</style>