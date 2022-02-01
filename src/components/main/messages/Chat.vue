<template>
  <div class="application-current-chat" id="main-current-chat" @contextmenu.prevent="rightClick">
    <div class="current-chat-menu">
      <div class="chat-menu-item back hide" id="back-to-chats">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" x="0px" y="0px"
             viewBox="0 0 219.151 219.151" fill="purple" xml:space="preserve">
                                <g>
                                    <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
      C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
      c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"/>
                                  <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
      c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
      c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
      c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"/>
                                </g>
                            </svg>
      </div>
      <div class="person-name">
        {{ room.name }}
      </div>
      <div class="make-call chat-menu-item">
          <svg class="icon" width="31" height="31" viewBox="0 0 31 31">
              <path
                  d="M6.23444 13.4161C8.71444 18.29 12.71 22.2683 17.5839 24.7656L21.3728 20.9767C21.8378 20.5117 22.5267 20.3567 23.1294 20.5633C25.0583 21.2006 27.1422 21.545 29.2778 21.545C30.225 21.545 31 22.32 31 23.2672V29.2778C31 30.225 30.225 31 29.2778 31C13.1061 31 0 17.8939 0 1.72222C0 0.775 0.775 0 1.72222 0H7.75C8.69722 0 9.47222 0.775 9.47222 1.72222C9.47222 3.875 9.81667 5.94167 10.4539 7.87056C10.6433 8.47333 10.5056 9.145 10.0233 9.62722L6.23444 13.4161Z" />
          </svg>
      </div>
      <div class="make-videocall chat-menu-item">
          <svg class="icon" width="47" height="31" viewBox="0 0 47 31">
              <path
                  d="M36.5556 11.625V2.58333C36.5556 1.1625 35.3806 0 33.9444 0H2.61111C1.175 0 0 1.1625 0 2.58333V28.4167C0 29.8375 1.175 31 2.61111 31H33.9444C35.3806 31 36.5556 29.8375 36.5556 28.4167V19.375L47 29.7083V1.29167L36.5556 11.625Z" />
          </svg>
      </div>
      <div class="options chat-menu-item">
        <svg class="icon" width="40" height="12" viewBox="0 0 40 12">
          <g>
            <circle cx="6" cy="6" r="6" transform="rotate(-90 6 6)"/>
            <circle cx="6" cy="20" r="6" transform="rotate(-90 6 6)"/>
            <circle cx="6" cy="34" r="6" transform="rotate(-90 6 6)"/>
          </g>
        </svg>
      </div>
      <ul class="chat-menu-options-menu">
        <li class="chat-menu-options-menu__delete">
          <div class="chat-menu-options-menu__item">Delete chat</div>
        </li>
      </ul>
    </div>
    <div class="chat-block" id="chat-block">
      <ul :class="{'active': rightClicked}" @click="hideMenu()" class="right-click-menu" id="right-click-menu">
        <li class="right-click-menu__reply">
          <div class="right-click-menu-item">Reply</div>
        </li>
        <li class="right-click-menu__forward">
          <div class="right-click-menu-item">Forward message</div>
        </li>
        <li class="right-click-menu__copy">
          <div class="right-click-menu-item">Copy message</div>
        </li>
        <li class="right-click-menu__escrow">
          <div class="right-click-menu-item" @click="setModal(modals.CREATE_DEAL)">Create Escrow deal</div>
        </li>
        <li class="right-click-menu__task">
          <div class="right-click-menu-item">Add new task</div>
        </li>
      </ul>
      <div class="messages">
        <template
          v-for="(message, index) of room.timeline"
          >
          <div
            v-if="message.event.type === 'm.room.message'"
            :key="index"
            :class="isIncoming(message) ? 'incoming' : 'outcoming'"
            @click.right.prevent="rightClick"
            class="message-holder">
            <div class="message">
              <pre class="message-content">{{ message.event.content.body }}</pre>
              <div class="message-timestamp">{{ unixTimestampToLocalTime(message.event.origin_server_ts) }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="send-message">
      <div class="attach-document chat-menu-item">
        <svg class="icon" width="36" height="42" viewBox="0 0 36 42">
          <path
              d="M32.9891 16.6942L18.6197 35.3178C15.8583 38.8968 10.6545 39.6105 6.99118 36.9126C3.32784 34.2148 2.59734 29.1309 5.35877 25.5519L20.9777 5.30888C22.702 3.07405 25.958 2.6275 28.2455 4.31212C30.5331 5.99674 30.9901 9.17774 29.2658 11.4126L16.1459 28.4167C15.4587 29.3074 14.1504 29.4868 13.2388 28.8154C12.3271 28.144 12.1434 26.8659 12.8307 25.9752L24.7011 10.5905L22.2146 8.75943L10.3442 24.1441C8.61989 26.379 9.07697 29.56 11.3645 31.2446C13.652 32.9292 16.908 32.4827 18.6323 30.2478L31.7522 13.2437C34.5137 9.66471 33.7832 4.58079 30.1198 1.88296C26.4565 -0.814877 21.2527 -0.101198 18.4913 3.47777L2.87234 23.7208C-0.926188 28.6439 0.0777442 35.6308 5.1169 39.3418C10.1561 43.0529 17.3076 42.072 21.1061 37.1489L35.4756 18.5253L32.9891 16.6942Z"/>
        </svg>
      </div>
      <div class="write-message ">
        <textarea 
          v-model="typedMessage"
          @input="messageBoxHeightCalculate"
          @keydown.enter.exact.prevent="sendMessage"
          rows="1"
          :placeholder="language['type your message here']">
        </textarea>
      </div>
      <div class="record-message chat-menu-item">
        <svg class="icon" width="34" height="45" viewBox="0 0 34 45">
          <path
              d="M17 28.4211C21.0314 28.4211 24.2614 25.2474 24.2614 21.3158L24.2857 7.10526C24.2857 3.17368 21.0314 0 17 0C12.9686 0 9.71429 3.17368 9.71429 7.10526V21.3158C9.71429 25.2474 12.9686 28.4211 17 28.4211ZM29.8714 21.3158C29.8714 28.4211 23.7029 33.3947 17 33.3947C10.2971 33.3947 4.12857 28.4211 4.12857 21.3158H0C0 29.3921 6.60571 36.0711 14.5714 37.2316V45H19.4286V37.2316C27.3943 36.0947 34 29.4158 34 21.3158H29.8714Z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "Chat",
  data() {
    return {
      typedMessage: "",
      rightClicked: false
    }
  },
  props: {
    room: Object,
    setModal: Function
  },
  computed: {
    ...mapState(['components', 'languageData', 'currentUser', 'matrixClient', 'modals']),
    language() {
      return this.languageData[this.components.MESSAGES] || {};
    }
  },
  methods: {
    ...mapMutations(['setRoomMate']),
    isIncoming(message) {
      return message.event.sender !== this.currentUser.matrixUserId;
    },
    unixTimestampToLocalTime(unixTimestamp) {
      return new Date(unixTimestamp).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hourCycle: 'h23'});
    },
    sendMessage(event) {
      const content = {
        "body": this.typedMessage,
        "msgtype": "m.text"
      };
      this.matrixClient.sendEvent(this.room.roomId, "m.room.message", content, "");
      this.typedMessage = '';
      event.target.style.height = 'auto';
    },
    hideMenu(){
      const menu = document.querySelector('.right-click-menu');
      menu.classList.remove("active");
    },
    rightClick(event) {
      this.setRoomMate(this.room.name);
      const x = event.clientX ;
      const y = event.clientY;
      const menu = document.querySelector('.right-click-menu');
      menu.style.top = `${y}px`;
      menu.style.left = `${x}px`;
      menu.classList.add("active");

      //TODO
      // const messagesBox = document.querySelector('.messages');
      //

      // const messagesSizes = messagesBox.getBoundingClientRect();
      // const top = event.target.offsetTop + event.layerY > messagesBox.scrollHeight - menu.scrollHeight - 15
      //             ? messagesBox.scrollHeight - menu.scrollHeight - 15
      //             : event.target.offsetTop + event.layerY;
      // const left = event.clientX - messagesSizes.left > messagesBox.scrollWidth - menu.scrollWidth - 15
      //             ? messagesBox.scrollWidth - menu.scrollWidth - 15
      //             : event.clientX - messagesSizes.left;
      // menu.style.top = `${top}px`;
      // menu.style.left = `${left}px`;
      // menu.classList.add("active");
    },
    messageBoxHeightCalculate(event) {
      const messageBoxMaxRows = 10;
      const messageBoxLineHeight = 18;
      const messageBoxVerticalPaddings = 20;
      const messageBoxMaxHeight = messageBoxMaxRows * messageBoxLineHeight + messageBoxVerticalPaddings;
      event.target.style.height = 'auto';
      if (event.target.scrollHeight >= messageBoxMaxHeight) {
        event.target.style.overflowY = 'auto';
        event.target.scrollTop = event.target.scrollHeight;
      }
      else {
        event.target.style.overflowY = '';
      }
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  }
}
</script>

<style scoped>

</style>