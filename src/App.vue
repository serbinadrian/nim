<template>
  <main>
    <div class="nim-application light-theme" id="main">
      <!-- <div class="application-line">
          <div class="application-name">
              nim
          </div>
      </div> -->
      <div class="application-body" id="main-body">

        <Navbar v-if="isSignedIn"/>
        <component :is="currentComponent"/>

      </div>
    </div>

  </main>
</template>

<script>
import {mapState} from 'vuex'
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
    ...mapState(['currentComponent', 'isSignedIn'])
  },
  created() {
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

</style>
