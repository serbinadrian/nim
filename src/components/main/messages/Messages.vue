<template>
  <div class="user-messages">
      <Chats 
        @active-room-selected="activeRoomSelected"
        />
      <Chat 
        v-if="!isBlank" 
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
.user-messages {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex: auto;
}



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