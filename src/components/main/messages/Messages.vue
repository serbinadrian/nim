<template>
  <div class="user-messages">
      <Chats 
        @active-room-selected="activeRoomSelected"
        @create-single="toggleSingle"/>
      <Chat 
        v-if="!isBlank" 
        :room="activeRoom"/>
      <BlankChat 
        v-if="isBlank"/>
      <ModalTemplate 
        :display-as="modals.CREATE_CHAT"
        :is-displayed="isCreateSingleModalActive"
        @close="toggleSingle"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Chats from "./Chats";
import Chat from "./Chat";
import BlankChat from "./BlankChat";
import ModalTemplate from "../../modal/ModalTemplate.vue"
export default {
  name: "Messages",
  data(){
    return{
      activeRoom: null,
      isCreateSingleModalActive: false,
    }
  },
  components: {
    Chats,
    Chat,
    BlankChat,
    ModalTemplate
  },
  computed: {
    ...mapState(['modals']),
    isBlank() {
      return this.activeRoom === null;
    }
  },
  methods: {
    activeRoomSelected(room) {
      this.activeRoom = room;
    },
    toggleSingle() {
      this.isCreateSingleModalActive = !this.isCreateSingleModalActive;
    }
  }
}
</script>

<style scoped>
/*-----transitions-----*/
.show-enter,
.show-leave-to {
  opacity: 0;
}

.show-enter-active,
.show-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
  transition-timing-function: ease-in-out;
}

.show-enter-to, .show-leave {
  opacity: 1;
}
</style>