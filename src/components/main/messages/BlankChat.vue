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
    ...mapState(['backendUrl', 'errCodes', 'components']),
    language() {
      return this.$store.getters.getLanguageData[this.components.MESSAGES] || {};
    },
  }
}
</script>

<style scoped>

</style>