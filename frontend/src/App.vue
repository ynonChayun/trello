<template>
<!-- <app-header /> -->
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import appHeader from './components/app-header.vue'
export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },

  components: {
  appHeader
  },
}
</script>
