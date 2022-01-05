<template>
  <div class="user-messages">
      <Chats/>
      <Chat v-if="!isBlank"/>
      <BlankChat v-if="isBlank"/>
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
      isBlank: false
    }
  },
  components: {
    Chats,
    Chat,
    BlankChat
  }
}
</script>

<style scoped>

</style>