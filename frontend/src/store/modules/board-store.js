import { boardService } from '../../service/board-service.js'

export const boardStore = {
    state: {
        boards: null,
    },
  
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
  },
  actions: {
    async loadBoards({ commit }) {
      const boards = await boardService.query()
      commit({ type: 'setBoards', boards })
    },
  },
}


