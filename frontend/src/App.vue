<template>
  <section class="app">
    <header>this is the header</header>
    <RouterView />
  </section>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>
