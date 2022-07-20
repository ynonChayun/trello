import { boardService } from '../../service/board-service.js'

export const boardStore = {
  state: {
    boards: null,
    currBoard: null,
  },

  getters: {
    boards({ boards }) {
      return boards
    },
    currBoard({ currBoard }) {
      return currBoard
    },
    currLabels({ boards }) {
      return boards[0].labels
    },
    currMembers({ boards }) {
      return boards[0].members
    },
  },

  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board
    },
    saveBoard(state, { savedBoard }) {
      const boardIdx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      )
      if (boardIdx !== -1) state.boards[boardIdx] = savedBoard
      else state.boards.push(savedBoard)
    },
    deleteBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId)
    },
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query()
        commit({ type: 'setBoards', boards })
      } catch (err) {
        throw err
      }
    },
    async saveBoard({ commit }, { board }) {
      try {
        const savedBoard = await boardService.save(board)
        commit({ type: 'saveBoard', savedBoard })
      } catch (err) {
        throw err
      }
    },
    async deleteBoard({ commit }, { boardId }) {
      try {
        await boardService.remove(boardId)
        commit({ type: 'deleteBoard', boardId })
      } catch (err) {
        throw err
      }
    },
    async getById({ commit }, { boardId }) {
      try {
        const board = await boardService.getById(boardId)
        commit({ type: 'setCurrBoard', board })
      } catch (err) {
        throw err
      }
    },
  },
}
