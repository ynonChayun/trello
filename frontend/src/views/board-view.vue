<template>
  <section v-if="board" class="board-view" :style="boardBackground">
    <board-header v-if="board" @board-update="saveBoard" :board="board" />
    <router-view></router-view>
    <div v-if="board" class="board-canvas">
      <div class="board-fixed-container">
        <Container
          @drop="onColumnDrop($event)"
          group-name="cols"
          tag="div"
          orientation="horizontal"
        >
          <Draggable v-for="(group, idx) in board.groups" :key="group.id">
            <div>
              <group-preview class="group-container" @saveBoard="saveBoard" :key="group.id" :group="group"
                :boardId="board._id" :idx="idx" :board="board" @onEditIsToggle="editIsToggle" />
            </div>
          </Draggable>

          <div class="add-new-group">
            <button
              class="btn-add-group"
              v-if="!isAddNewGroup"
              @click="isAddNewGroup = true"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  d="M12,22 L12,2 M2,12 L22,12"
                ></path>
              </svg>
              &nbsp; Add another list
            </button>

            <form v-else class="group-preview">
              <input
                class="input-title"
                v-model="newGroup.title"
                type="text"
                @change="addGroup"
                placeholder="Enter list title"
              />

              <div class="save-element-section">
                <button @click.prevent="addGroup">Add list</button>
                <svg
                  @click="undoAddList"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    d="M3,3 L21,21 M3,21 L21,3"
                  ></path>
                </svg>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '../service/board-service'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../service/helpers.js'
import groupPreview from '../components/group-preview.vue'
import editableText from '../components/editable-text.vue'
import boardHeader from '../components/board-header.vue'

export default {
  name: 'board-view',
  components: {
    Container,
    Draggable,
    groupPreview,
    editableText,
    boardHeader,
  },
  data() {
    return {
      // currBoard: null,
      isAddNewGroup: false,
      newGroup: JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup)),
      blackScreen: false,
    }
  },
  async created() {
    const { boardId } = this.$route.params
    await this.$store.dispatch({ type: 'getById', boardId })
  },
  methods: {
    goToEdit(groupId, taskId) {
      this.$router.push(`/board/${this.board._id}/${groupId}/${taskId}`)
      console.log('groupId: ')
    },
    onColumnDrop(dropResult) {
      const board = Object.assign({}, this.board)
      board.groups = applyDrag(board.groups, dropResult)
      this.saveBoard(board)
    },
    getCardPayload(groupId) {
      return (index) => {
        return this.currBoard.groups.filter((p) => p.id === groupId)[0].tasks[
          index
        ]
      }
    },
    async saveBoard(board) {
      await this.$store.dispatch({ type: 'saveBoard', board })
    },
    async addGroup() {
      if (!this.newGroup.title) return
      // this.newGroup.board = { id: this.board._id };
      await this.$store.dispatch({ type: 'saveGroup', group: this.newGroup })
      this.newGroup = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyGroup)
      )
    },
    editIsToggle() {
      this.blackScreen = !this.blackScreen
    }
  },
  computed: {
    board() {
      return this.$store.getters.currBoard
    },
    boardBackground() {
      return this.board.imgUrl
        ? { backgroundImage: `url(${this.board.imgUrl})` }
        : { backgroundColor: this.board.style.backgroundColor }
    },
    boradClass() {
      if (this.blackScreen) return {
        "backgroundColor": '#000000a3',
        "z-index": "10",
        // "width": "100vh",
        "height": "100%",
        "position": 'fixed',
        "right": '0',
        "left": '0',
        "top": '0',
        "bottom": '0',
      }
    }
  },
  unmounted() {},
}
</script>

<style>
.smooth-dnd-container.horizontal {
  display: flex !important;
}
</style>
