<template>
  <div class="application-blank" id="application-blank">
    <div class="application-blank__logo">[nim]</div>
    <div class="application-blank__text">{{ language['please select a chat'] }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BlankChat",
  computed: {
    ...mapState(['components', 'languageData']),
    language() {
      return this.languageData[this.components.MESSAGES] || {};
    },
  }
}
</script>

<style scoped>
.application-blank {
  position: relative;
  margin-left: 25px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: var(--secondary-color-light);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  flex: auto; 
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-direction: column;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
}

.application-blank__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 900;
  font-size: 150px;
  color: var(--asphalt-tinted);
  opacity: 0.05;
  line-height: 1.333;
  letter-spacing: 0.07em;
  margin: 0;
  user-select: none;
}

.application-blank__text {
  font-size: 20px;
}
</style>