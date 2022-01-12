<template>
    <div class="application-chats" id="main-chats">
      <div class="search-chats" id="chat-search">
        <input type="text" placeholder="Search" value="">
      </div>
      <div class="chats" id="chats">
        <button class="chat chat-add-new" type="button"></button>
        <form action="" class="chat chat-add-new-window chat-add-new-window_hidden">
          <input type="text" placeholder="@exampleName" spellcheck="false">
          <button type="submit" disabled>Create chat</button>
        </form>
        <div class="chat" data-roomId="">
          <div class="person-avatar">
            <img src="../../../../public/img/room-image.png" alt="">
          </div>
          <div class="chat-preview">
            <div class="person-name">
              Satoshi Nakamoto
            </div>
            <div class="person-message">
              You: Are you Japanese?
            </div>
          </div>
        </div>
        <div class="chat active" data-roomId="">
          <div class="person-avatar">
            <img src="../../../../public/img/room-image.png" alt="">
          </div>
          <div class="chat-preview">
            <div class="person-name">
              Albert Einstein
            </div>
            <div class="person-message">
              Something about science
            </div>
          </div>
        </div>
        <div class="chat" data-roomId="">
          <div class="person-avatar">
            <img src="../../../../public/img/room-image.png" alt="">
          </div>
          <div class="chat-preview">
            <div class="person-name">
              Test
            </div>
            <div class="person-message">
              test message
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Chats"
}
</script>

<style scoped>

</style>