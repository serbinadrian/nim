<template>
  <div class="application-menu" id="main-menu">
    <button class="application-menu-item current-user">
      <img src="../../../public/img/room-image.png" alt="avatar">
    </button>
    <div class="application-menu-item messenger"
         :class="{'active': selectedNavbarItem === 'Messages'}"
         @click="setCurrentComponent('Messages'); selectedNavbarItem = 'Messages'">
      <svg width="40" height="40" viewBox="0 0 40 40" class="icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 0H4C1.8 0 0 1.8 0 4V40L8 32H36C38.2 32 40 30.2 40 28V4C40 1.8 38.2 0 36 0ZM36 28H8L4 32V4H36V28Z"/>
      </svg>
    </div>
    <div class="application-menu-item balance"
         :class="{'active': selectedNavbarItem === 'Balance'}"
         @click="setCurrentComponent('Balance'); selectedNavbarItem = 'Balance'">
      <svg width="40" height="37" viewBox="0 0 48 46" class="stroke-icon"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M43.8947 35.5789V33.5789H41.8947H22.9474C22.6092 33.5789 22.2894 33.5034 22.0036 33.3684H22.9474H44H46V31.3684V14.5263V12.5263H44H22.9474H22.0036C22.2894 12.3913 22.6092 12.3158 22.9474 12.3158H41.8947H43.8947V10.3158V8.21053C43.8947 4.79017 41.1046 2 37.6842 2H8.21053C4.76261 2 2 4.79669 2 8.21053V37.6842C2 41.0981 4.76261 43.8947 8.21053 43.8947H37.6842C41.1046 43.8947 43.8947 41.1046 43.8947 37.6842V35.5789ZM20.9474 31.3684V32.3115C20.8123 32.0252 20.7368 31.7054 20.7368 31.3684V14.5263C20.7368 14.1893 20.8123 13.8695 20.9474 13.5832V14.5263V31.3684ZM31.3684 24.1053C30.7256 24.1053 30.2105 23.5902 30.2105 22.9474C30.2105 22.3046 30.7256 21.7895 31.3684 21.7895C32.0112 21.7895 32.5263 22.3046 32.5263 22.9474C32.5263 23.5902 32.0112 24.1053 31.3684 24.1053Z"/>
      </svg>
    </div>
    <div class="application-menu-item deals"
         :class="{'active': selectedNavbarItem === 'Deals'}"
         @click="setCurrentComponent('Deals'); selectedNavbarItem = 'Deals'">
      <svg width="32" height="40" viewBox="0 0 43 51" class="stroke-icon"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2 42.9987V43C2 46.2915 4.6624 49 7.98 49H32C35.3046 49 38 46.3046 38 43V19V18.1716L37.4142 17.5858L25.4142 5.58579L24.8284 5H24H8C4.68282 5 2.02067 7.70782 2.02 10.9987C2.02 10.9989 2.02 10.9991 2.02 10.9992C2.02 10.9995 2.02 10.9997 2.02 11L2 42.9987ZM24 19V14.8284L28.1716 19H24Z"/>
      </svg>
    </div>
    <div class="application-menu-item tasks"
         :class="{'active': selectedNavbarItem === 'Tasks'}"
         @click="setCurrentComponent('Tasks'); selectedNavbarItem = 'Tasks'">
      <svg width="40" height="33" viewBox="0 0 40 33" class="icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.95 4.71667L35.2833 7.05L14.05 28.2833L4.71667 18.95L7.05 16.6167L14.05 23.6167L32.95 4.71667ZM32.95 0L14.05 18.9L7.05 11.9L0 18.95L14.05 33L40 7.05L32.95 0Z"/>

      </svg>
    </div>
    <div class="application-menu-item exit" @click="signOut()">
      <svg width="40" height="40" viewBox="0 0 40 40" class="icon" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15.7556 27.9778L18.8889 31.1111L30 20L18.8889 8.88889L15.7556 12.0222L21.4889 17.7778H0V22.2222H21.4889L15.7556 27.9778ZM35.5556 0H4.44444C1.97778 0 0 2 0 4.44444V13.3333H4.44444V4.44444H35.5556V35.5556H4.44444V26.6667H0V35.5556C0 38 1.97778 40 4.44444 40H35.5556C38 40 40 38 40 35.5556V4.44444C40 2 38 0 35.5556 0Z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  name: "Navbar",
  data(){
    return{
      selectedNavbarItem: 'Messages'
    }
  },
  methods: {
    ...mapMutations(['setCurrentComponent']),
    ...mapActions(['signOut'])
  }
}
</script>

<style scoped>

</style>