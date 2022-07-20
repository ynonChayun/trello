<template>
  <section class="board-list">
    <h1>hi from boards page</h1>
    <form @submit.prevent="saveBoard">
      <input type="text" v-model="newBoard.title" placeholder="Board title" />
      <button>Create</button>
    </form>
    <div class="boards-container">
      <router-link
        v-for="board in boards"
        :to="`/board/${board._id}`"
        :key="board._id"
        class="board-preview"
        >{{ board.title }}
        <button @click.stop="deleteBoard(board._id)">X</button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newBoard: {
        title: null,
      },
    }
  },

  methods: {
    saveBoard() {
      this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
    },
    deleteBoard(boardId) {
      this.$store.dispatch({ type: 'deleteBoard', boardId })
    },
  },

  computed: {
    boards() {
      console.log(this.$store.getters.boards);
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
  gap: 2em;
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
