<template>
    <div class="application-chats" id="main-chats">
      <div class="add-chat-buttons" id="chat-search">
        <button 
          class="add-chat-button" 
          type="button"
          @click="createSingle"
          :data-tooltip="language['create single chat']"
          data-flow="bottom">
          <span class="add-chat-button__icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 9C11.4862 9 13.5 6.98625 13.5 4.5C13.5 2.01375 11.4862 0 9 0C6.51375 0 4.5 2.01375 4.5 4.5C4.5 6.98625 6.51375 9 9 9ZM9 11.25C5.99625 11.25 0 12.7575 0 15.75V18H18V15.75C18 12.7575 12.0038 11.25 9 11.25Z"/>
            </svg>
          </span>
          {{ language['create single'] }}
        </button>
        <button 
          class="add-chat-button" 
          type="button"
          :data-tooltip="language['create group chat']"
          data-flow="bottom">
          <span class="add-chat-button__icon">
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.75676 8.75676C11.1758 8.75676 13.1351 6.79743 13.1351 4.37838C13.1351 1.95932 11.1758 0 8.75676 0C6.3377 0 4.37838 1.95932 4.37838 4.37838C4.37838 6.79743 6.3377 8.75676 8.75676 8.75676ZM8.75676 10.9459C5.83419 10.9459 0 12.4127 0 15.3243V17.5135H17.5135V15.3243C17.5135 12.4127 11.6793 10.9459 8.75676 10.9459Z"/>
              <path d="M17.8379 11.3514C19.5402 11.3514 20.919 9.97259 20.919 8.27029C20.919 6.56799 19.5402 5.18921 17.8379 5.18921C16.1356 5.18921 14.7569 6.56799 14.7569 8.27029C14.7569 9.97259 16.1356 11.3514 17.8379 11.3514ZM17.8379 12.8919C15.7813 12.8919 11.6758 13.9241 11.6758 15.973V17.5135H24.0001V15.973C24.0001 13.9241 19.8946 12.8919 17.8379 12.8919Z"/>
            </svg>
          </span>
          {{ language['create group'] }}
        </button>
      </div>
      <div class="chats" id="chats">
        <div 
          class="chat"
          :class="{'active': room === activeRoom}"
          v-for="(room, index) of rooms"
          :key="index"
          @click="makeActive(room)">
          <div class="person-avatar">
            <img src="../../../../public/img/room-image.png" alt="">
          </div>
          <div class="chat-preview">
            <div class="person-name">
              {{ room.name }}
            </div>
            <div class="person-message">
              {{ findTheLastMessageFromTimeline(room, currentUser.matrixUserId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Chats",
  data() {
    return {
      rooms: [],
      activeRoom: {}
    };
  },
  computed: {
    ...mapState(['components', 'languageData', 'currentUser', 'matrixClient']),
    language() {
      return this.languageData[this.components.MESSAGES] || {};
    }
  },
  methods: {
    findTheLastMessageFromTimeline(room, userId) {
      const timeline = room.timeline;
      for (let i = timeline.length - 1; i >= 0; i--) {
        const message = timeline[i].event;
        if (message.type === 'm.room.message') {
          return (userId === message.sender ? 'You: ' : '') + message.content.body;
        }
      }
      return '';
    },
    makeActive(room) {
      this.activeRoom = room;
      this.$emit('active-room-selected', room);
    },
    createSingle() {
      this.$emit('create-single');
    }
  },
  created() {
    this.matrixClient.startClient()
      .then(() => {
        if (this.matrixClient.isInitialSyncComplete()) {
          this.rooms = this.matrixClient.getRooms();
        } else {
          this.matrixClient.once("sync", () => {
            this.rooms = this.matrixClient.getRooms();
            for (const room of this.matrixClient.getRooms())
              if (room.selfMembership === 'invite')
                this.matrixClient.joinRoom(room.roomId);

            this.matrixClient.on("RoomMember.membership", (event, member) => {
              if (member.membership === "invite" && member.userId === this.currentUser.matrixUserId) {
                this.matrixClient.joinRoom(member.roomId)
                  .then(function() {
                    this.rooms = this.matrixClient.getRooms();
                  })
              }
              this.matrixClient.once("sync", () => { this.rooms = this.matrixClient.getRooms() });
            });
          });
        }
      });
  },
  destroyed() {

  }
}
</script>

<style scoped>

</style>