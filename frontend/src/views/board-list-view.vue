<template>
  <section class="board-list">
    <h1>hi from boards page</h1>
    <div class="boards-container">
      <board-preview v-for="board in boards" :board="board" :key="board._id" />
      <div class="create-board">Create new board</div>
      <popup-create @createdBoard="saveBoard" />
    </div>
  </section>
</template>

<script>
import boardPreview from '../components/board-preview.vue'
import popupCreate from '../components/popup-create.vue'
export default {
  data() {
    return {
      isCreate: false,
    }
  },

  methods: {
    saveBoard(newBoard) {
      this.$store.dispatch({ type: 'saveBoard', newBoard })
    },
    deleteBoard(boardId) {
      this.$store.dispatch({ type: 'deleteBoard', boardId })
    },
  },

  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },

  components: {
    boardPreview,
    popupCreate,
  },
}
</script>
