<template>
  <section class="board-list">
    <h1>hi from boards page</h1>
    <div class="boards-container">
      <router-link
        v-for="board in boards"
        :to="`/board/${board._id}`"
        :key="board._id"
        class="board-preview"
        >{{ board.title }}</router-link
      >
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
}
</script>

<style>
.board-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boards-container {
  display: flex;
  flex-wrap: wrap;
}

.board-preview {
  color: white;
  font-weight: bold;
  background-color: darkcyan;
  border-radius: 0.1875em;
  padding: 0.5em;
  text-decoration: none;
}
</style>
