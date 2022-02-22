<template>
  <main>
    <div 
      :class="selectedTheme + '-theme'"
      class="nim-application" 
      id="main">
      <!-- <div class="application-line">
          <div class="application-name">
              nim
          </div>
      </div> -->
      <div 
        :class="currentComponentApplicationBodyClass"
        class="application-body" 
        id="main-body">

        <Navbar v-if="isSignedIn"/>
        <component :is="currentComponent"/>

      </div>

      <ModalTemplate :display-as="displayModalAs"/>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/navbar/Navbar";
import Messages from "./components/main/messages/Messages";
import Balance from "./components/main/balance/Balance";
import Tasks from "./components/main/tasks/Tasks";
import Deals from "./components/main/deals/Deals";
import ModalTemplate from "./components/modal/ModalTemplate";
export default {
  name: 'App',
  components: {
    SignIn,
    SignUp,
    Navbar,
    Messages,
    Balance,
    Tasks,
    Deals,
    ModalTemplate
  },
  computed:{
    ...mapState(['currentComponent', 'matrixClient', 'displayModalAs', 'selectedTheme']),
    ...mapGetters(['isSignedIn']),
    currentComponentApplicationBodyClass() {
      return `application-body_${this.currentComponent}`;
    }
  },
  methods: {
    ...mapActions(['defineCurrentComponent', 'defineMatrixClient', 'defineLanguageData'])
  },
  created() {
    if (this.isSignedIn)
      this.defineMatrixClient();
    this.defineLanguageData();
    this.defineCurrentComponent();
    window.addEventListener('load', function handler() {
      window.removeEventListener('load', handler);
      const preloader = document.querySelector('.preloader');
      preloader.classList.add('preloader_hiding');
      setTimeout(() => {
        preloader.classList.remove('preloader_hiding');
        preloader.classList.add('preloader_hidden');
      }, 250);
    });
  }
}
</script>

<style>
@import url('../public/css/normalize.css');
@import url('../public/css/base.css');
@import url('../public/css/helpers.css');
@import url('../public/css/fonts.css');
@import url('../public/css/tooltip.css');


/*  #Variables  */
/*    #Generic variables    */
:root {
  /* Theme selection */
  --theme-selection-transition-duration: .25s;
  --theme-selection-transition-timing-function: cubic-bezier(0.12, 0, 0.39, 0);

  --application-width: 100%;
  /*1440px;*/
  --application-height: 100%;
  /*1024px;*/

  /**Generic theme colors**/
  --primary-button-color: #26493E;
  --primary-button-font-color: #EBE5E5;

  --submit-button-color: #26493E;
  --in-progress-button-color: #70A694;
  --cancelled-button-color: #492626;
}
/*    /Generic variables    */

/*    #Theme variables    */
.nim-application.light-theme {
  /**light theme colors**/
  --primary-color: #B3F8E1;
  --secondary-color: #90CFBA;
  --primary-font-color: #FFFFFF;
  --secondary-font-color: #232829;
  --secondary-sub-font-color: #293133;
  --message-sender-color: #70A694;

  --authorization-wrapper-background-color: rgba(144, 207, 186, 0.88);

  --outcoming-message-color: #376B5A;
  --incoming-message-color: #293133;
  --time-color: #EBE5E5;
  --chat-menues-color: #26493E;
}

.nim-application.dark-theme {
  /**dark theme colors**/
  --primary-color: #293133;
  --secondary-color: #232829;
  --primary-font-color: #FFFFFF;
  --secondary-font-color: #7EDEBE;
  --secondary-sub-font-color: #7FFFD4;
  --message-sender-color: #2E393C;

  --authorization-wrapper-background-color: rgba(41, 49, 51, 0.88);

  --outcoming-message-color: #376B5A;
  --incoming-message-color: #293133;
  --time-color: #EBE5E5;
  --chat-menues-color: #26493E;
  --chat-menues-color-hover: #376B5A;
}
/*    /Theme variables    */
/*  /Variables  */


/*  #Theme transitions  */
.nim-application .application-body,
.nim-application .application-line {
  transition: background var(--theme-selection-transition-duration) var(--theme-selection-transition-timing-function);
}

.nim-application .application-name {
  transition: color var(--theme-selection-transition-duration) var(--theme-selection-transition-timing-function);
}

.nim-application .icon {
  transition: fill var(--theme-selection-transition-duration) var(--theme-selection-transition-timing-function);
}

.nim-application .stroke-icon {
  transition: stroke var(--theme-selection-transition-duration) var(--theme-selection-transition-timing-function);
}
/*  /Theme transitions  */


/*  #Generic styles  */
.headline {
  font-family: Inter, sans-serif;
  font-size: 48px;
  font-weight: bold;
  color: var(--secondary-font-color);
  line-height: 1;
  margin: .3em 0 .7em;
}

.flex {
  display: -webkit-flex !important;
  display: -ms-flex !important;
  display: flex !important;
}

.show {
  display: block !important;
}

.hide {
  display: none !important;
}

.icon {
  fill: var(--secondary-font-color);
}

.stroke-icon {
  fill: none;
  stroke-width: 4px;
  stroke: var(--secondary-font-color);
}

/* generic styles for inputs and textareas */
.input {
  background-color: var(--message-sender-color);
  color: var(--secondary-sub-font-color);
  outline: 1px solid transparent;
  transition-property: outline, opacity;
  transition-duration: .25s;
  transition-timing-function: ease-out;
}

.input::placeholder {
  color: var(--secondary-font-color);
}

.input:focus {
  outline: 2px solid var(--secondary-sub-font-color);
}

.input:disabled {
  opacity: 0.5;
}


/* generic styles for buttons */
.button {
  cursor: pointer;
  background-color: var(--primary-button-color);
  color: var(--primary-button-font-color);

  transition-property: outline, opacity, filter;
  transition-duration: .25s;
  transition-timing-function: ease-out;

  filter: brightness(1);
  opacity: 1;
}

.button:hover,
.button:focus {
  outline: none;
  filter: brightness(1.2);
  transition-duration: .15s;
}

.button:active {
  filter: brightness(0.85);
  transition-duration: .05s;
}

.button:disabled {
  filter: brightness(1);
  opacity: 0.5;
}


.application-name {}

.nim-application {
  width: var(--application-width);
  height: var(--application-height);
  min-height: 570px;
  min-width: 325px;
  position: relative;
  overflow: hidden;
}

.application-body {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-wrap: nowrap;
  background: var(--primary-color)
}

.application-body:not(.application-body_SignIn):not(.application-body_SignUp) {
  padding: 25px;
}

.application-line {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--secondary-color);
}

.application-name {
  margin-left: 20px;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 25px;
  letter-spacing: 0.07em;
  color: var(--secondary-sub-font-color);
}
/*  /Generic styles  */
</style>
