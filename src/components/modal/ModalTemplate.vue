<template>
  <transition 
    name="fade-in"
    @after-enter="isContentDisplayed = true">
    <div v-if="isDisplayed" class="modal">
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

export default {
  name: 'ModalTemplate',
  data() {
    return {
      isContentDisplayed: false
    };
  },
  props: {
    displayAs: String,
    isDisplayed: Boolean
  },
  components: {
    CreateChat
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
  }

  .modal__content-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }


/* Transitions */
  .fade-in-enter, .fade-in-leave-to {
    opacity: 0;
  }

  .fade-in-enter-active, .fade-in-leave-active {
    transition: opacity .15s ease-out;
  }

  .fade-in-enter-to, .fade-in-leave {
    opacity: 1;
  }


  .pop-up-enter, .pop-up-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }

  .pop-up-enter-active, .pop-up-leave-active {
    transition: all .15s ease-out;
  }

  .pop-up-enter-to, .pop-up-leave {
    transform: translateY(0px);
    opacity: 1;
  }

</style>
