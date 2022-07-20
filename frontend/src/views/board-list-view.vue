<template>
  <section class="board-list">
    <h1>hi from boards page</h1>
  </section>
</template>

<script>
import boardPreview from '../components/board-preview.vue'
export default {
  computed: {
    boards() {
      return this.$store.getters.currBoard
    },
  },

  components: {
    boardPreview,
  },
}
</script>

<style lang="scss" scoped>
</style>
