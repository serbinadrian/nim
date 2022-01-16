<template>
  <main>
    <div class="nim-application light-theme" id="main">
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
export default {
  name: 'App',
  components: {
    SignIn,
    SignUp,
    Navbar,
    Messages,
    Balance,
    Tasks,
    Deals
  },
  computed:{
    ...mapState(['currentComponent']),
    ...mapGetters(['isSignedIn']),
    currentComponentApplicationBodyClass() {
      return `application-body_${this.currentComponent}`;
    }
  },
  methods: {
    ...mapActions(['defineCurrentComponent', 'defineMatrixUser', 'defineLanguageData'])
  },
  created() {
    if (this.isSignedIn)
      this.defineMatrixUser();
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
/* For Balance, Deals, Tasks */
.headline {
  font-family: Inter, sans-serif;
  font-size: 48px;
  font-weight: bold;
  color: #232829;
  line-height: 1;
  margin: .3em 0 .7em;
}
</style>
