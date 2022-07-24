<template>
<section class="app-header-sections">
  <app-header />
  <main-nav />
  </section>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import appHeader from './components/app-header.vue'
import mainNav from './components/main-nav.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },

  components: {
    appHeader,
    mainNav
  },
}
</script>
