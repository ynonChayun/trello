import { boardService } from '../../service/board-service.js'

export const boardStore = {
    state: {
        boards: null,
    },
    getters: {
        boards({ boards }) {
            return boards
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
    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query()
            commit({ type: 'setBoards', boards })
        },
    },
}


