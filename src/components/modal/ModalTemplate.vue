<template>
  <transition 
    name="fade-in"
    @after-enter="isContentDisplayed = true">
    <div v-if="displayAs" class="modal">
      <div
        @click="isContentDisplayed = false"
        class="modal__background">
        <transition 
          name="pop-up"
          @after-leave="$emit('close')">
          <div 
            v-if="isContentDisplayed"
            class="modal__content-wrapper">
            <component 
              :is="displayAs"
              @close="$emit('close')"/>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import CreateChat from './interface/CreateChat.vue'
import CreateDeal from './interface/CreateDeal.vue'

export default {
  name: 'ModalTemplate',
  props: {
    displayAs: String
  },
  data() {
    return {
      isContentDisplayed: false
    };
  },
  components: {
    CreateChat,
    CreateDeal
  },
  computed: {
    ...mapState(['modals', 'isModalDisplayed'])
  }
}
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  .modal__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .6);
    overflow-y: scroll;
  }

  .modal__content-wrapper {
    position: relative;
    padding: 100px 0;
    min-height: 100vh;
  }


/* Transitions */
  .fade-in-enter, .fade-in-leave-to {
    opacity: 0;
  }

  .fade-in-enter-active, .fade-in-leave-active {
    transition: opacity .1s ease-out;
  }

  .fade-in-enter-to, .fade-in-leave {
    opacity: 1;
  }


  .pop-up-enter, .pop-up-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }

  .pop-up-enter-active, .pop-up-leave-active {
    transition: all .1s ease-out;
  }

  .pop-up-enter-to, .pop-up-leave {
    transform: translateY(0px);
    opacity: 1;
  }

</style>
