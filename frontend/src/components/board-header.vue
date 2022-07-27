<template>
  <section class="board-header">
    <div class="left-nav">
      <input
        @focus="$event.target.select()"
        @change="boardTitleChange"
        type="text"
        v-model="boardCopy.title"
      />
      <button @click="boardStarred" class="star-icon">
        <font-awesome-icon
          v-if="board?.isStarred"
          class="starred"
          icon="fa-solid fa-star"
        />
        <font-awesome-icon v-else class="unstarred" icon="fa-regular fa-star" />
      </button>
      <span class="divider"></span>
      <div v-if="board.members?.length" class="board-header-members">
        <div v-for="member in board.members" :key="member._id" class="avatar">
          <img v-if="member.imgUrl" :src="member.imgUrl" />
          <span v-else>{{ formattedName(member.fullname) }}</span>
        </div>
        <button>Invite</button>
      </div>
    </div>
    <div class="right-nav">
      <button>Filter</button>
      <button>Show menu</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    board: Object,
  },

  data() {
    return {
      boardCopy: null,
    }
  },

  created() {
    this.boardCopy = JSON.parse(JSON.stringify(this.board))
  },

  methods: {
    boardStarred() {
      const board = JSON.parse(JSON.stringify(this.board))
      board.isStarred = !board.isStarred
      this.$emit('board-starred', board)
    },
    boardTitleChange() {
      this.boardCopy.title = this.boardCopy.title
      this.$emit('title-change', this.boardCopy)
    },
    formattedName(memberName) {
      const spaceIdx = memberName.indexOf(' ')
      return memberName.charAt(0) + memberName.charAt(spaceIdx + 1)
    },
  },
}
</script>
