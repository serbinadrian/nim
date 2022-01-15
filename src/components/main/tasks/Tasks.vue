<template>
 <div class="tasks">
   <h1>{{ language['tasks'] }}</h1>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Tasks",
  computed: {
    ...mapState(['components']),
    language() {
      return this.$store.getters.getLanguageData[this.components.TASKS] || {};
    }
  }
}
</script>

<style scoped>

</style>