<template>
  <div class="user-messages">
      <Chats 
        :set-modal="setModal"
        @active-room-selected="activeRoomSelected"
        />
      <Chat 
        v-if="!isBlank" 
        :set-modal="setModal"
        :room="activeRoom"/>
      <BlankChat 
        v-if="isBlank"/>
  </div>
</template>

<script>
import Chats from "./Chats";
import Chat from "./Chat";
import BlankChat from "./BlankChat";

export default {
  name: "Messages",
  props: {
    setModal: Function
  },
  data(){
    return{
      activeRoom: null,
    }
  },
  components: {
    Chats,
    Chat,
    BlankChat
  },
  computed: {
    isBlank() {
      return this.activeRoom === null;
    }
  },
  methods: {
    activeRoomSelected(room) {
      this.activeRoom = room;
    },
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