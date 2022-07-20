import { boardService } from '../../service/board-service.js'

export const boardStore = {
    state: {
        boards: null,
    },
    getters: {
        boards({ boards }) {
            return boards
        },
    },
    mutations: {
    },
    actions: {
    }
}


