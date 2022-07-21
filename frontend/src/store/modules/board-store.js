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
    getEmptyTask() {
      return boardService.getEmptyTask();
    },
    getEmptyGroup() {
      return boardService.getEmptyGroup();
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
      const idx = state.boards.findIndex((board) => board._id === boardId)
      state.boards.splice(idx, 1)
      // state.boards = state.boards.filter((board) => board._id !== boardId)
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
        console.log('savedBoard: ', savedBoard)
        commit({ type: 'saveBoard', savedBoard })
        commit({ type: 'setCurrBoard', board: savedBoard })
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
        return board
      } catch (err) {
        throw err
      }
    },
    async saveGroup({ state, commit, dispatch }, { group }) {
      const board = JSON.parse(JSON.stringify(state.currBoard))
      if (group.id) {
        const groupIdx = board.groups.findIndex(({ id }) => id === group.id);
        board.groups.splice(groupIdx, 1, group);
      } else {
        group.id = boardService._makeId();
        board.groups.push(group);
      }
      await dispatch({ type: 'saveBoard', board });
      commit({ type: 'setCurrBoard', board });
    },
    async saveTask({ commit, state, dispatch }, { groupId, task, activityType }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      if (groupId) {
        var group = board.groups.find((savedGroup) => {
          return savedGroup.id === groupId;
        });
      } else {
        group = board.groups.find((savedGroup) => savedGroup.tasks.some((groupTask) => groupTask.id === task.id));
      }
      if (task.id) {
        const taskIdx = group.tasks.findIndex(({ id }) => id === task.id);
        group.tasks.splice(taskIdx, 1, task);
      } else {
        task.id = boardService._makeId();
        group.tasks.push(task);
      }
      try {
        await dispatch('saveBoard', { board });
        commit({ type: 'setCurrBoard', board });
      } catch (err) {
        console.log('err:', err);
      }
    },
    async removeGroup({ commit, state, dispatch }, { groupId }) {
      const board = JSON.parse(JSON.stringify(state.currBoard))
      const idx = board.groups.findIndex((group) => group.id === groupId)
      board.groups.splice(idx, 1)
      try {
        await dispatch('saveBoard', { board });
        commit({ type: 'setCurrBoard', board });
      } catch (err) {
      }
    },
  },
}
