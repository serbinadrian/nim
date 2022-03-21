<template>
  <div class="application-menu" id="main-menu">
    <button class="application-menu-item current-user">
      <img src="../../../public/img/room-image.png" alt="avatar">
    </button>
    <button class="application-menu-item messenger"
         :class="{'active': selectedNavbarItem === components.MESSAGES}"
         @click="selectNavbarItem(components.MESSAGES)"
         :data-tooltip="language['messages']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="icon" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 0H4C1.8 0 0 1.8 0 4V40L8 32H36C38.2 32 40 30.2 40 28V4C40 1.8 38.2 0 36 0ZM36 28H8L4 32V4H36V28Z"/>
        </svg>
      </div>
    </button>
    <button class="application-menu-item balance"
         :class="{'active': selectedNavbarItem === components.BALANCE}"
         @click="selectNavbarItem(components.BALANCE)"
         :data-tooltip="language['balance']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="stroke-icon" width="40" height="37" viewBox="0 0 48 46" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M43.8947 35.5789V33.5789H41.8947H22.9474C22.6092 33.5789 22.2894 33.5034 22.0036 33.3684H22.9474H44H46V31.3684V14.5263V12.5263H44H22.9474H22.0036C22.2894 12.3913 22.6092 12.3158 22.9474 12.3158H41.8947H43.8947V10.3158V8.21053C43.8947 4.79017 41.1046 2 37.6842 2H8.21053C4.76261 2 2 4.79669 2 8.21053V37.6842C2 41.0981 4.76261 43.8947 8.21053 43.8947H37.6842C41.1046 43.8947 43.8947 41.1046 43.8947 37.6842V35.5789ZM20.9474 31.3684V32.3115C20.8123 32.0252 20.7368 31.7054 20.7368 31.3684V14.5263C20.7368 14.1893 20.8123 13.8695 20.9474 13.5832V14.5263V31.3684ZM31.3684 24.1053C30.7256 24.1053 30.2105 23.5902 30.2105 22.9474C30.2105 22.3046 30.7256 21.7895 31.3684 21.7895C32.0112 21.7895 32.5263 22.3046 32.5263 22.9474C32.5263 23.5902 32.0112 24.1053 31.3684 24.1053Z"/>
        </svg>
      </div>
    </button>
    <button class="application-menu-item deals"
         :class="{'active': selectedNavbarItem === components.DEALS}"
         @click="selectNavbarItem(components.DEALS)"
         :data-tooltip="language['deals']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="stroke-icon" width="32" height="40" viewBox="0 0 43 51" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M2 42.9987V43C2 46.2915 4.6624 49 7.98 49H32C35.3046 49 38 46.3046 38 43V19V18.1716L37.4142 17.5858L25.4142 5.58579L24.8284 5H24H8C4.68282 5 2.02067 7.70782 2.02 10.9987C2.02 10.9989 2.02 10.9991 2.02 10.9992C2.02 10.9995 2.02 10.9997 2.02 11L2 42.9987ZM24 19V14.8284L28.1716 19H24Z"/>
        </svg>
      </div>
    </button>
    <button class="application-menu-item tasks"
         :class="{'active': selectedNavbarItem === components.TASKS}"
         @click="selectNavbarItem(components.TASKS)"
         :data-tooltip="language['tasks']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="icon" width="40" height="33" viewBox="0 0 40 33" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.95 4.71667L35.2833 7.05L14.05 28.2833L4.71667 18.95L7.05 16.6167L14.05 23.6167L32.95 4.71667ZM32.95 0L14.05 18.9L7.05 11.9L0 18.95L14.05 33L40 7.05L32.95 0Z"/>
        </svg>
      </div>
    </button>
    <button class="application-menu-item language"
         @click="defineLanguageData(selectedLanguage === 'ru' ? 'en' : 'ru')"
         :data-tooltip="language['switch language']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="stroke-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-width="2" d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8"/>
        </svg>
      </div>
    </button>
    <button class="application-menu-item language"
         @click="setSelectedTheme(selectedTheme === themes.LIGHT ? themes.DARK : themes.LIGHT)"
         :data-tooltip="language['switch theme']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 6.3499999 6.3500002" xml:space="preserve"><g transform="matrix(1.2,0,0,1.2,-0.6349608421325668,-0.6348815917968746)"><g xmlns="http://www.w3.org/2000/svg" id="layer1" transform="translate(0 -290.65)"><path id="path2103" d="m1.322412 291.17911a.26460982.26460982 0 0 0 -.2635498.26561v1.82728a.26465001.26465001 0 0 0 0 .0444v1.03818a.26460982.26460982 0 0 0 .2635498.26355h.2656168.7927165v1.58802a.26460982.26460982 0 0 0 .2656169.26355h1.0588501a.26460982.26460982 0 0 0 .2635499-.26355v-1.58802h.7927165.2661335a.26460982.26460982 0 0 0 .2635499-.26355v-1.04076a.26465001.26465001 0 0 0 0-.0331v-1.83607a.26460982.26460982 0 0 0 -.2635499-.26554h-.2661335-3.1734499zm.2656168.52916h3.1734499v1.32189h-3.1734499zm0 1.85157h3.1734499v.52917h-1.0330119a.26465001.26465001 0 0 0 -.021188.001.26464845.26464845 0 0 0 -.2676839.26458v1.58802h-.5296834v-1.58802a.26460982.26460982 0 0 0 -.2671672-.26975.26460982.26460982 0 0 0 -.039274.004h-1.0154415z" font-variant-ligatures="normal" font-variant-position="normal" font-variant-caps="normal" font-variant-numeric="normal" font-variant-alternates="normal" font-feature-settings="normal" text-indent="0" text-align="start" text-decoration-line="none" text-decoration-style="solid" text-decoration-color="rgb(0,0,0)" text-transform="none" text-orientation="mixed" white-space="normal" shape-padding="0" isolation="auto" mix-blend-mode="normal" solid-color="rgb(0,0,0)" solid-opacity="1" vector-effect="none" paint-order="stroke fill markers"></path></g></g></svg>
      </div>
    </button>
    <button class="application-menu-item exit" @click="signOut()"
         :data-tooltip="language['exit']" data-flow="right">
      <div class="application-menu-item__wrapper">
        <svg class="icon" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M15.7556 27.9778L18.8889 31.1111L30 20L18.8889 8.88889L15.7556 12.0222L21.4889 17.7778H0V22.2222H21.4889L15.7556 27.9778ZM35.5556 0H4.44444C1.97778 0 0 2 0 4.44444V13.3333H4.44444V4.44444H35.5556V35.5556H4.44444V26.6667H0V35.5556C0 38 1.97778 40 4.44444 40H35.5556C38 40 40 38 40 35.5556V4.44444C40 2 38 0 35.5556 0Z"/>
        </svg>
      </div>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: "Navbar",
  data(){
    return{
      selectedNavbarItem: 'Messages',
    }
  },
  computed: {
    ...mapState(['components', 'themes', 'selectedTheme', 'selectedLanguage', 'languageData']),
    language() {
      return this.languageData[this.components.NAVBAR] || {};
    }
  },
  methods: {
    ...mapMutations(['setCurrentComponent', 'setCurrentUser', 'setMatrixClient', 'setWalletData', 'setUsername', 'setSelectedTheme']),
    ...mapActions(['defineLanguageData']),
    selectNavbarItem(item) {
      this.setCurrentComponent(item);
      this.selectedNavbarItem = item;
    },
    signOut(){
      this.setCurrentComponent(this.components.AUTHORIZATION);
      this.setCurrentUser({});
      this.setMatrixClient({});
      this.setWalletData({});
      this.setUsername('');
    }
  }
}
</script>

<style scoped>
/*  #Theme transitions  */
.nim-application .application-menu {
  transition: background var(--theme-selection-transition-duration) var(--theme-selection-transition-timing-function);
}

.nim-application .application-menu-item__wrapper::before {
  transition-property: transform, background;
  transition-duration: .125s, var(--theme-selection-transition-duration);
  transition-timing-function: ease-out, var(--theme-selection-transition-timing-function);
}

.nim-application .icon,
.nim-application .stroke-icon {
  transition-property: opacity, fill, stroke;
  transition-duration: .15s, var(--theme-selection-transition-duration), var(--theme-selection-transition-duration);
  transition-timing-function: ease-out, var(--theme-selection-transition-timing-function), var(--theme-selection-transition-timing-function);
}
/*  /Theme transitions  */


/*  #Generic styles  */
.application-menu {
  height: 100%;
  width: 60px;
  font-size: 16px;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 40px 40px 30px 30px;
  border-radius: 40px 40px 30px 30px;
  background: var(--secondary-color);
}

.application-menu-item {
  text-align: center;
  line-height: 60px;
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  cursor: pointer;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  position: relative;
}

.application-menu-item__wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  transform: scale(0%);
  background: var(--primary-color);
}

.application-menu-item.active .application-menu-item__wrapper::before {
  transform: scale(100%);
}

.application-menu-item svg {
  position: relative;
  width: 30px;
  height: 30px;
  opacity: .65;
}

.application-menu-item:hover svg,
.application-menu-item.active svg {
  opacity: 1;
}

.application-menu-item.current-user img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100px;
}

.application-menu-item.tasks {
  margin-bottom: auto;
}

.application-menu .icon {
  fill: var(--secondary-font-color);
}

.application-menu .stroke-icon {
  stroke: var(--secondary-font-color);
}
/*  /Generic styles  */
</style>