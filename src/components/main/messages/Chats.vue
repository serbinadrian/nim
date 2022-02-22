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
          @click="createGroup"
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
import { mapState, mapMutations } from 'vuex'

export default {
  name: "Chats",
  data() {
    return {
      rooms: [],
      activeRoom: {}
    };
  },
  computed: {
    ...mapState(['components', 'languageData', 'currentUser', 'matrixClient', 'modals']),
    language() {
      return this.languageData[this.components.MESSAGES] || {};
    }
  },
  methods: {
    ...mapMutations(['setDisplayModalAs']),
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
      this.setDisplayModalAs(this.modals.CREATE_CHAT);
    },
    createGroup() {
      // this.setDisplayModalAs(this.modals.CREATE_DEAL);
    }
  },
  created() {
    this.matrixClient.startClient()
      .then(() => {
        if (this.matrixClient.isInitialSyncComplete()) {
          this.rooms = this.matrixClient.getRooms();
          this.matrixClient.on("RoomMember.membership", (event, member) => {
            if (member.membership === "invite" && member.userId === this.currentUser.matrixUserId) {
              this.matrixClient.joinRoom(member.roomId)
                .then(function() {
                  this.rooms = this.matrixClient.getRooms();
                })
            }
            this.matrixClient.once("sync", () => { this.rooms = this.matrixClient.getRooms() });
          });
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
.application-chats {
  width: 300px;
  margin-left: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.add-chat-buttons {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.add-chat-button {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  padding: 1em 1.2em;
  border-radius: 100px;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  outline: none;
  color: var(--secondary-sub-font-color);
  background-color: var(--secondary-color);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  filter: brightness(1);
  transition-property: box-shadow, filter;
  transition-duration: .2s;
  transition-timing-function: ease-out;
}

.add-chat-button:hover {
  filter: brightness(1.05);
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
}

.add-chat-button:active {
  transition-duration: .1s;
  filter: brightness(0.9);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
}

.add-chat-button__icon svg {
  fill: var(--secondary-sub-font-color);
}

.chats {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  -webkit-border-radius: 30px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--secondary-color);
}

.chat {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-wrap: nowrap;
  -ms-align-items: center;
  align-items: center;
  margin: 2px 2px 10px 2px;
  padding: 10px 10px 10px 10px;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color .2s ease-out;
}

.chat:hover {
  outline: 1px solid var(--primary-color);
}

.chat.active {
  background: var(--primary-color);
}

.chat-preview {
  max-width: calc(100% - 90px);
}

.person-avatar {
  margin-right: 10px;
}

.person-avatar img {
  border-radius: 100px;
  width: 60px;
  height: 60px;
}

.person-name {
  margin-bottom: 6px;
  font-size: 2rem;
  font-weight: bold;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--secondary-font-color);
}

.person-message {
  font-weight: 600;
  font-size: 1.6rem;
  /* width: 90%; */
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--secondary-sub-font-color);
}
</style>