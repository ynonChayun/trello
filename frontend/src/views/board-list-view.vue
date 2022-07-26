<template>
  <section class="board-list">
    <h1>hi from boards page</h1>
    <div class="boards-container">
      <div v-if="isStarredBoards" class="starred-boards">
        <div class="boards-status">
          <span>
            <font-awesome-icon class="icon" icon="fa-regular fa-star" />
          </span>
          <h3>Starred boards</h3>
        </div>
        <div class="boards">
          <board-preview
            @board-starred="saveBoard"
            v-for="board in starredBoards"
            :board="board"
            :key="board._id"
          />
        </div>
      </div>
      <div class="recent-boards">
        <div class="boards-status">
          <span>
            <font-awesome-icon class="icon" icon="fa-regular fa-clock" />
          </span>
          <h3>Recently viewed</h3>
        </div>
        <div class="boards">
          <board-preview
            @board-starred="saveBoard"
            v-for="board in recentBoards"
            :board="board"
            :key="board._id"
          />
          <div class="create-board">Create new board</div>
        </div>
      </div>
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
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board })
    },
    deleteBoard(boardId) {
      this.$store.dispatch({ type: 'deleteBoard', boardId })
    },
  },

  computed: {
    boards() {
      return this.$store.getters.boards
    },
    starredBoards() {
      return this.boards.filter((board) => board.isStarred)
    },
    recentBoards() {
      return this.boards.filter((board) => !board.isStarred)
    },
    isStarredBoards() {
      return this.boards.some((board) => board.isStarred)
    },
  },

  components: {
    boardPreview,
    popupCreate,
  },
}
</script>
