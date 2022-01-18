<template>
  <div class="user-messages">
      <Chats 
        @active-room-selected="activeRoomSelected"
        @create-single="toggleSingle"/>
      <Chat :room="activeRoom" v-if="!isBlank"/>
      <BlankChat v-if="isBlank"/>
      <transition name="show">
        <CreateRoomModal
          v-show="isCreateSingleModalActive"
          :closeCreateSingle="toggleSingle"/>
      </transition>
  </div>
</template>

<script>
import Chats from "./Chats";
import Chat from "./Chat";
import BlankChat from "./BlankChat";
import CreateRoomModal from "./CreateRoomModal";
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
    CreateRoomModal
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